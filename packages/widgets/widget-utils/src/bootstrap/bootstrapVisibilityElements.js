import {
  ATTRIBUTE_VISIBILITY,
  ATTRIBUTE_WIDGET_REF,
  ID_INITIAL_VISIBILITY_STYLES,
  ID_VISIBILITY_STYLES
} from './constants'
import * as remoteLogger from './remoteLogger'

const createStyleElement = id => {
  const style = document.createElement('style')
  style.id = id
  document.head.appendChild(style)
  return style
}

export const setGlobalStyles = (backendUrl, id, css) => {
  try {
    const style = document.getElementById(id) || createStyleElement(id)
    style.innerHTML = css
  } catch (error) {
    remoteLogger.logException(backendUrl, `Could not apply gobal styles.`, error)
  }
}

export const setVisibilityStateStyles = (backendUrl, widgetKey, visibilityState) => {
  const css = `[${ATTRIBUTE_WIDGET_REF}="${widgetKey}"][${ATTRIBUTE_VISIBILITY}="${visibilityState}"] {
  display: inherit;
}`
  setGlobalStyles(backendUrl, `${ID_VISIBILITY_STYLES}-${widgetKey}`, css)
}

const bootstrapVisibilityElements = params => {
  const {backendUrl} = params

  const css = `[${ATTRIBUTE_VISIBILITY}] {display: none;}`
  const id = ID_INITIAL_VISIBILITY_STYLES
  setGlobalStyles(backendUrl, id, css)
}

export default bootstrapVisibilityElements
