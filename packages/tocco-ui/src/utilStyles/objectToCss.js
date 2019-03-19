import _get from 'lodash/get'

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

  for (const [key, value] of Object.entries(declarations)) {
    let cssValue
    if (Array.isArray(value)) {
      const themePath = value.shift()
      if (value.length === 0) {
        cssValue = _get(props.theme, themePath, 0)
      } else {
        const values = value.map(themeIndex => _get(props.theme, themePath, 0)[themeIndex])
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
