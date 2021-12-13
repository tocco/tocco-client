import {buildInputFromDom, loadScriptAsync} from './utils'

const bootstrapWidgets = async params => {
  const {backendUrl} = params

  const widgetContainerNodeList = document.querySelectorAll('[data-tocco-widget]')
  const widgetContainers = Array.prototype.slice.call(widgetContainerNodeList)
  const apps = [...new Set(widgetContainers.map(container => container.getAttribute('data-tocco-widget')))]

  await Promise.all(
    apps.map(app => {
      return loadScriptAsync(`${backendUrl}/js/tocco-${app}/dist/index.js`)
    })
  )

  widgetContainers.forEach(container => {
    const app = container.getAttribute('data-tocco-widget')
    const input = {
        backendUrl,
        ...buildInputFromDom(container)
    }

    window.reactRegistry.render(app, container, '', input, {}, `${backendUrl}/js/tocco-${app}/dist/`)
  })
}

export default bootstrapWidgets
