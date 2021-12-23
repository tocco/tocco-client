import {consoleLogger} from 'tocco-util'

import {ATTRIBUTE_WIDGET_KEY, ERROR_CODE_INVALID_DOMAIN} from './constants'
import {executeRequest, enhanceExtractedBody} from './requests'
import {getEventHandlers, getTheme, loadScriptAsync} from './utils'

const getWidgetKey = container => container.getAttribute(ATTRIBUTE_WIDGET_KEY)

const handleRequestError = (response, key) => {
  const {ok, status, body} = response
  if (!ok) {
    if (status === 403 && body?.errorCode === ERROR_CODE_INVALID_DOMAIN) {
      // TODO: TOCDEV-4757 - log remote
      consoleLogger.logError(body.message)
    }

    if (status === 404) {
      // TODO: TOCDEV-4757 - log remote
      consoleLogger.logError(`Widget config '${key}' not found.`)
    }

    return undefined
  }
  return response
}

const initializeWidget = async (backendUrl, container) => {
  const key = getWidgetKey(container)
  const widgetConfig = await executeRequest(`${backendUrl}/nice2/rest/widget/configs/${key}`)
    .then(enhanceExtractedBody)
    .then(response => handleRequestError(response, key))
    .then(response => response?.body)
    .catch(error => {
      // TODO: TOCDEV-4757 - try log remote
      consoleLogger.logError(`Could not fetch widget config '${key}'.`, error)
    })

  if (widgetConfig) {
    const {appName, packageName, locale, config} = widgetConfig
    await loadScriptAsync(`${backendUrl}/js/tocco-${packageName}/dist/index.js`)

    const customTheme = getTheme()
    const input = {
      backendUrl,
      ...(customTheme ? {customTheme} : {}),
      locale,
      ...config
    }
    const eventHandlers = getEventHandlers(container)
    const srcPath = `${backendUrl}/js/tocco-${packageName}/dist/`

    // TODO: TOCDEV-4802 - make methods available
    window.reactRegistry.render(appName, container, '', input, eventHandlers, srcPath)
  }
}

const bootstrapWidgets = async params => {
  const {backendUrl} = params

  const widgetContainerNodeList = document.querySelectorAll(`[${ATTRIBUTE_WIDGET_KEY}]`)
  const widgetContainers = Array.prototype.slice.call(widgetContainerNodeList)

  await Promise.all(widgetContainers.map(container => initializeWidget(backendUrl, container)))
}

export default bootstrapWidgets
