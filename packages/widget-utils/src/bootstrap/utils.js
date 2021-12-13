export const snakeToCamel = s => s.replace(/(-\w)/g, m => m[1].toUpperCase())

export const loadScriptAsync = src =>
  new Promise(resolve => {
    const tag = document.createElement('script')
    tag.src = src
    tag.async = true
    tag.type = 'text/javascript'
    tag.onload = () => {
      resolve()
    }
    tag.crossorogin = true

    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  })

export const transformObjectValue = val => {
  try {
    return JSON.parse(val)
  } catch (e) {
    return val
  }
}

export const getBackendUrl = document => {
  const jsFileSource = document.currentScript.getAttribute('src')
  const {protocol, host} = new URL(jsFileSource)
  return protocol + '//' + host
}

export const buildInputFromDom = widgetContainer => {
    const attributes = Array.prototype.slice.call(widgetContainer.attributes)
    return attributes.reduce(
      (acc, val) => ({
        ...acc,
        [snakeToCamel(val.name.replace('data-', ''))]: transformObjectValue(val.value)
      }),
      {}
    )
}
