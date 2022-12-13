import _eq from 'lodash/eq'
import {consoleLogger} from 'tocco-util'
import {utils} from 'tocco-util/bundle'

import {setWidgetStateStyles} from './bootstrapWidgetStates'
import {ATTRIBUTE_WIDGET_KEY, BOOTSTRAP_SCRIPT_OBJ_NAME, ERROR_CODE_INVALID_DOMAIN} from './constants'
import * as remoteLogger from './remoteLogger'
import {executeRequest, enhanceExtractedBody} from './requests'
import {attachMethods, getEventHandlers, getTheme, getVersion} from './utils'

const getWidgetKey = container => container.getAttribute(ATTRIBUTE_WIDGET_KEY)

const handleRequestError = (backendUrl, response, key) => {
  const {ok, status, body} = response
  if (!ok) {
    if (status === 403 && body?.errorCode === ERROR_CODE_INVALID_DOMAIN) {
      remoteLogger.logError(backendUrl, body.message)
    }

    if (status === 404) {
      remoteLogger.logError(backendUrl, `Widget config '${key}' not found.`)
    }

    return undefined
  }
  return response
}

const makeHandleStateChange =
  (backendUrl, widgetKey, eventHandler) =>
  (...args) => {
    const [{states}] = args
    setWidgetStateStyles(backendUrl, widgetKey, states)
    if (typeof eventHandler === 'function') {
      eventHandler(...args)
    }
  }

const initializeWidget = async (backendUrl, assetUrl, container) => {
  const key = getWidgetKey(container)
  const widgetConfig = await executeRequest(`${backendUrl}/nice2/rest/widget/configs/${key}`)
    .then(enhanceExtractedBody)
    .then(response => handleRequestError(backendUrl, response, key))
    .then(response => response?.body)
    .catch(error => {
      remoteLogger.logException(backendUrl, `Could not fetch widget config '${key}'.`, error)
    })

  if (widgetConfig) {
    const {appName, packageName, locale, config} = widgetConfig

    try {
      await utils.loadScriptAsync(`${assetUrl}${utils.getEntryFilePath(packageName, appName)}`)
    } catch (error) {
      remoteLogger.logException(backendUrl, `Could not fetch package 'tocco-${packageName}'.`, error)
      return
    }

    const externalEventHandlers = getEventHandlers(container)
    const eventHandlers = {
      ...externalEventHandlers,
      onStateChange: makeHandleStateChange(backendUrl, key, externalEventHandlers.onStateChange)
    }
    const customTheme = getTheme()
    const input = {
      backendUrl,
      ...(customTheme ? {customTheme} : {}),
      locale,
      ...config,
      appContext: {
        embedType: 'widget',
        widgetConfigKey: key
      },
      ...eventHandlers
    }
    const srcPath = `${assetUrl}/js/tocco-${packageName}/dist/`

    try {
      const methods = window.reactRegistry.render(appName, container, '', input, eventHandlers, srcPath)
      attachMethods(container, methods)
    } catch (error) {
      remoteLogger.logException(backendUrl, `Could not render app '${appName}'.`, error)
    }
  }
}

/**
 * Widgets should get initialized only once.
 * Sets global variable to block other embedded bootstrap scripts from execution.
 * Only the first bootstrap script gets executed.
 *
 * @returns boolean to indicate whether script can be executed
 */
const initializeBootstrap = params => {
  const version = getVersion()
  const bootstrapScriptObj = {version, ...params}

  const existingBootstrapScriptObj = window[BOOTSTRAP_SCRIPT_OBJ_NAME]
  if (existingBootstrapScriptObj) {
    consoleLogger.log('tocco-widget-utils - bootstrap script is already initialized')

    const mismatch = !_eq(existingBootstrapScriptObj, bootstrapScriptObj)
    if (mismatch) {
      /* eslint-disable max-len */
      consoleLogger.logError(
        'More than one bootstrap script with different settings has been found. Add only one bootstrap script per page.',
        '\nInitialized bootstrap script:',
        existingBootstrapScriptObj,
        '\nIgnored bootstrap script:',
        bootstrapScriptObj
      )
      /* eslint-enable max-len */
    }

    return false
  }

  window[BOOTSTRAP_SCRIPT_OBJ_NAME] = bootstrapScriptObj
  consoleLogger.log(`tocco-widget-utils - v${version} - bootstrap`)

  return true
}

const bootstrapWidgets = async params => {
  const canExecute = initializeBootstrap(params)
  if (!canExecute) {
    return
  }

  const {backendUrl, assetUrl} = params

  const widgetContainerNodeList = document.querySelectorAll(`[${ATTRIBUTE_WIDGET_KEY}]`)
  const widgetContainers = Array.prototype.slice.call(widgetContainerNodeList)

  await Promise.all(widgetContainers.map(container => initializeWidget(backendUrl, assetUrl, container)))
}

export default bootstrapWidgets
