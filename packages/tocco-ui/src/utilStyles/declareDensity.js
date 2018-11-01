import objectToCss from './objectToCss'
import {spaceScale} from './modularScale'

const declareDensity = props => objectToCss({
  'line-height': ['lineHeights', props.dense ? 0 : 1],
  'padding': props.dense ? spaceScale(props, -4) : `${spaceScale(props, -3)} ${spaceScale(props, -2)}`
}, props)

export default declareDensity
