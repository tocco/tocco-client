import {ATTRIBUTE_PACKAGE, ATTRIBUTE_WIDGET} from './constants'
import {buildInputFromDom, getEventHandlers, getTheme, loadScriptAsync} from './utils'

const getWidgetName = container => container.getAttribute(ATTRIBUTE_WIDGET)

const getPackageName = container => container.getAttribute(ATTRIBUTE_PACKAGE) || getWidgetName(container)

const bootstrapWidgets = async params => {
  const {backendUrl} = params

  const widgetContainerNodeList = document.querySelectorAll(`[${ATTRIBUTE_WIDGET}]`)
  const widgetContainers = Array.prototype.slice.call(widgetContainerNodeList)
  const packages = [...new Set(widgetContainers.map(container => getPackageName(container)))]

  await Promise.all(
    packages.map(packageName => {
      return loadScriptAsync(`${backendUrl}/js/tocco-${packageName}/dist/index.js`)
    })
  )

  widgetContainers.forEach(container => {
    const app = getWidgetName(container)
    const packageName = getPackageName(container)
    const customTheme = getTheme()
    const input = {
      backendUrl,
      ...(customTheme ? {customTheme} : {}),
      ...buildInputFromDom(container)
    }
    const eventHandlers = getEventHandlers(container)

    window.reactRegistry.render(app, container, '', input, eventHandlers, `${backendUrl}/js/tocco-${packageName}/dist/`)
  })
}

export default bootstrapWidgets
