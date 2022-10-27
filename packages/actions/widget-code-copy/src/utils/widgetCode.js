const getBaseUrl = domain => {
  if (domain === 'localhost') {
    return 'http://localhost:8080'
  }

  // customer.tocco.ch => widget will be added in legacy cms
  if (domain.includes('.tocco.ch')) {
    return `https://${domain}`
  }

  // use either cms tocco backend proxy url or tocco backend url
  return window.location.origin
}

export const generateWidgetCode = widgetConfig => {
  const {key, paths} = widgetConfig
  const domain = paths?.domain?.value

  const widgetCode = `<div data-tocco-widget-key="${key}"></div>
<script src="${getBaseUrl(domain)}/js/tocco-widget-utils/dist/bootstrap.js"></script>`

  return widgetCode
}
