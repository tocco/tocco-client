import objectToCss from './objectToCss'
import scale from './modularScale'
import {design} from '../utilStyles'

const declareDensity = props => objectToCss({
  'line-height': [props.dense ? 'lineHeights.dense' : 'lineHeights.regular'],
  'padding': props.look === design.look.BALL
    ? scale.space(props.theme, -3)
    : props.dense
      ? scale.space(props.theme, -4)
      : `${scale.space(props.theme, -3)} ${scale.space(props.theme, -2)}`
}, props)

export default declareDensity
