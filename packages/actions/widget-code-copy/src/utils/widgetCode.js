export const generateWidgetCode = widgetConfig => {
  const {key} = widgetConfig

  const widgetCode = `<div data-tocco-widget-key="${key}"></div>`
  return widgetCode
}
