import {
  ATTRIBUTE_WIDGET_REF,
  ATTRIBUTE_WIDGET_STATES,
  ID_INITIAL_WIDGET_STATE_STYLES,
  ID_WIDGET_STATE_STYLES
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
    remoteLogger.logException(backendUrl, `Could not apply global styles.`, error)
  }
}

export const setWidgetStateStyles = (backendUrl, widgetKey, widgetStates) => {
  const selector = widgetStates
    .map(state => `[${ATTRIBUTE_WIDGET_REF}="${widgetKey}"][${ATTRIBUTE_WIDGET_STATES}~="${state}"]`)
    .join(',\n')
  const css = `${selector} {
  display: inherit;
}`
  setGlobalStyles(backendUrl, `${ID_WIDGET_STATE_STYLES}-${widgetKey}`, css)
}

const bootstrapWidgetStates = params => {
  const {backendUrl} = params

  const css = `[${ATTRIBUTE_WIDGET_STATES}] {display: none;}`
  const id = ID_INITIAL_WIDGET_STATE_STYLES
  setGlobalStyles(backendUrl, id, css)
}

export default bootstrapWidgetStates
