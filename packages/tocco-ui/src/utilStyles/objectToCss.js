import {theme} from 'styled-system'

/**
 * parse object as css, additionally request values from theme
 * @param  {object} css declarations as object
 *   simple --> {[css property as key]: [css property as string, integer or float]}
 *   theme  --> {[css property as key]: [css property as array, first index =
 *     theme path, other indexes values to retrieve]}
 * @param  {object} react props
 * @return {string} css
 */

const objectToCss = (declarations, props) => {
  let css = ''
  for (const [property, value] of Object.entries(declarations)) {
    if (Array.isArray(value)) {
      let values = ''
      const themePath = value.shift()
      value.forEach(themeIndex => {
        const themeIdentifier = `${themePath}.${themeIndex}`
        values += ` ${theme(themeIdentifier)(props)}`
      })
      css += `${property}:${values};\n`
    } else {
      css += `${property}:${value};\n`
    }
  }
  return css
}

export default objectToCss
