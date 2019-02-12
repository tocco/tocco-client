import objectToCss from './objectToCss'
import {spaceScale} from './modularScale'

const declareDensity = props => objectToCss({
  'line-height': [props.dense ? 'lineHeights.dense' : 'lineHeights.regular'],
  'padding': props.dense ? spaceScale(props, -4) : `${spaceScale(props, -3)} ${spaceScale(props, -2)}`
}, props)

export default declareDensity
