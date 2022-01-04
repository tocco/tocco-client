import {ATTRIBUTE_WIDGET_KEY, ERROR_CODE_INVALID_DOMAIN} from './constants'
import * as remoteLogger from './remoteLogger'
import {executeRequest, enhanceExtractedBody} from './requests'
import {getEventHandlers, getTheme, loadScriptAsync} from './utils'

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

const initializeWidget = async (backendUrl, container) => {
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
      await loadScriptAsync(`${backendUrl}/js/tocco-${packageName}/dist/index.js`)
    } catch (error) {
      remoteLogger.logException(backendUrl, `Could not fetch package 'tocco-${packageName}'.`, error)
      return
    }

    const customTheme = getTheme()
    const input = {
      backendUrl,
      ...(customTheme ? {customTheme} : {}),
      locale,
      ...config
    }
    const eventHandlers = getEventHandlers(container)
    const srcPath = `${backendUrl}/js/tocco-${packageName}/dist/`

    try {
      // TODO: TOCDEV-4802 - make methods available
      window.reactRegistry.render(appName, container, '', input, eventHandlers, srcPath)
    } catch (error) {
      remoteLogger.logException(backendUrl, `Could not render app '${appName}'.`, error)
    }
  }
}

const bootstrapWidgets = async params => {
  const {backendUrl} = params

  const widgetContainerNodeList = document.querySelectorAll(`[${ATTRIBUTE_WIDGET_KEY}]`)
  const widgetContainers = Array.prototype.slice.call(widgetContainerNodeList)

  await Promise.all(widgetContainers.map(container => initializeWidget(backendUrl, container)))
}

export default bootstrapWidgets
