import objectToCss from './objectToCss'

const declareDensity = props => {
  return objectToCss({
    'line-height': ['lineHeights', props.dense ? 0 : 1],
    'padding': ['space', ...(props.dense ? [2] : [3, 4])]
  }, props)
}

export default declareDensity
