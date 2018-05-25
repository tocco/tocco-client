import objectToCss from './objectToCss'

const declareDensity = props => {
  if (props.dense) {
    return objectToCss({
      'line-height': ['lineHeights', 0],
      'padding': ['space', 2]
    }, props)
  } else {
    return objectToCss({
      'line-height': ['lineHeights', 1],
      'padding': ['space', 3, 4]
    }, props)
  }
}

export default declareDensity
