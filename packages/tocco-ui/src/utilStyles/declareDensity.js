import objectToCss from './objectToCss'
import scale from './modularScale'
import {design} from '../utilStyles'

const declareDensity = props => objectToCss({
  'line-height': [props.dense ? 'lineHeights.dense' : 'lineHeights.regular'],
  'padding': props.look === design.look.BALL
    ? scale.space(-3)(props)
    : props.dense
      ? scale.space(-4)(props)
      : `${scale.space(-3)(props)} ${scale.space(-2)(props)}`
}, props)

export default declareDensity
