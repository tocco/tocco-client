import {ATTRIBUTE_ID, EVENT_HANDLERS_OBJ_NAME, METHODS_OBJ_NAME, THEME_OBJ_NAME} from './constants'

export const snakeToCamel = s => s.replace(/(-\w)/g, m => m[1].toUpperCase())

const getId = container => container.getAttribute(ATTRIBUTE_ID)

export const loadScriptAsync = src =>
  new Promise((resolve, reject) => {
    const tag = document.createElement('script')
    tag.src = src
    tag.async = true
    tag.type = 'text/javascript'
    tag.onload = () => {
      resolve()
    }
    tag.onerror = () => {
      reject(new Error('Could not load script.'))
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

export const getAssetUrl = document => {
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

export const getTheme = () => {
  const theme = window[THEME_OBJ_NAME]
  if (theme && typeof theme === 'object') {
    return theme
  }

  return undefined
}

export const isMapOfFunctions = obj =>
  obj && Object.keys(obj).length > 0 && typeof obj[Object.keys(obj)[0]] === 'function'

export const getEventHandlers = container => {
  const handlers = window[EVENT_HANDLERS_OBJ_NAME]
  if (isMapOfFunctions(handlers)) {
    return handlers
  }

  if (handlers) {
    const id = getId(container)
    if (id) {
      const handlersOfId = handlers[id]
      if (isMapOfFunctions(handlersOfId)) {
        return handlersOfId
      }
    }
  }

  return {}
}

export const attachMethods = (container, methods) => {
  const id = getId(container)

  // only attach methods to global obj when id is defined explicitly
  if (id) {
    window[METHODS_OBJ_NAME] = {
      ...window[METHODS_OBJ_NAME],
      [id]: methods
    }
  }
}

export const getVersion = () => {
  const json = require('../../package.json')
  return json.version
}
