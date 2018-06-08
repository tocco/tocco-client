import {theme} from 'styled-system'

/**
 * parse object as css, additionally request values from theme
 * @param  {object} css declarations as object
 *   simple --> {[css property as key]: [css property as string, integer or float]}
 *   theme  --> {[css property as key]: [css property as array, first index =
 *     theme path without indexes, subsequent indexes get retrieved]}
 * @param  {object} react props
 * @return {string} css
 */

const objectToCss = (declarations, props) => {
  const css = []
  const getDefaultValue = themePath => theme(themePath, 0)(props)
  for (const [key, value] of Object.entries(declarations)) {
    let cssValue
    if (Array.isArray(value)) {
      const themePath = value.shift()
      if (value.length === 0) {
        cssValue = getDefaultValue(themePath)
      } else {
        const values = value.map(themeIndex => {
          const themeIdentifier = `${themePath}.${themeIndex}`
          return `${theme(themeIdentifier, 0)(props)}`
        })
        cssValue = values.join(' ')
      }
    } else {
      cssValue = value
    }
    css.push(`${key}: ${cssValue};`)
  }
  return css.join('\n')
}

export default objectToCss
