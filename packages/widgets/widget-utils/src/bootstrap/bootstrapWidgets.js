import {consoleLogger} from 'tocco-util'

import {ATTRIBUTE_WIDGET_KEY, BOOTSTRAP_SCRIPT_OBJ_NAME, ERROR_CODE_INVALID_DOMAIN} from './constants'
import * as remoteLogger from './remoteLogger'
import {executeRequest, enhanceExtractedBody} from './requests'
import {attachMethods, getEventHandlers, getTheme, getVersion, loadScriptAsync} from './utils'

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
      await loadScriptAsync(`${assetUrl}/js/tocco-${packageName}/dist/index.js`)
    } catch (error) {
      remoteLogger.logException(backendUrl, `Could not fetch package 'tocco-${packageName}'.`, error)
      return
    }

    const customTheme = getTheme()
    const input = {
      backendUrl,
      ...(customTheme ? {customTheme} : {}),
      locale,
      ...config,
      themeType: 'WIDGET',
      appContext: {
        embedType: 'widget'
      }
    }
    const eventHandlers = getEventHandlers(container)
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
const initializeBootstrap = () => {
  if (window[BOOTSTRAP_SCRIPT_OBJ_NAME]) {
    consoleLogger.log('tocco-widget-utils - bootstrap script is already initialized')
    return false
  }

  const version = getVersion()

  window[BOOTSTRAP_SCRIPT_OBJ_NAME] = {
    version
  }
  consoleLogger.log(`tocco-widget-utils - v${version} - bootstrap`)

  return true
}

const bootstrapWidgets = async params => {
  const canExecute = initializeBootstrap()
  if (!canExecute) {
    return
  }

  const {backendUrl, assetUrl} = params

  const widgetContainerNodeList = document.querySelectorAll(`[${ATTRIBUTE_WIDGET_KEY}]`)
  const widgetContainers = Array.prototype.slice.call(widgetContainerNodeList)

  await Promise.all(widgetContainers.map(container => initializeWidget(backendUrl, assetUrl, container)))
}

export default bootstrapWidgets
