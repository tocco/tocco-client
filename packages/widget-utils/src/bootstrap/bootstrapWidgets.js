import {buildInputFromDom, getEventHandlers, loadScriptAsync} from './utils'

const getWidgetName = container => container.getAttribute('data-tocco-widget')

const getPackageName = container => container.getAttribute('data-tocco-package') || getWidgetName(container)

const bootstrapWidgets = async params => {
  const {backendUrl} = params

  const widgetContainerNodeList = document.querySelectorAll('[data-tocco-widget]')
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
    const input = {
      backendUrl,
      ...buildInputFromDom(container)
    }
    const eventHandlers = getEventHandlers(container)

    window.reactRegistry.render(app, container, '', input, eventHandlers, `${backendUrl}/js/tocco-${packageName}/dist/`)
  })
}

export default bootstrapWidgets
