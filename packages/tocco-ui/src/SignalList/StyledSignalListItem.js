import {theme} from 'styled-system'

import {StyledLi} from '../Typography'
import {
  conditionPropTypes,
  shadeColor,
  stylingCondition
} from '../utilStyles'

const COLORS = {
  [stylingCondition.BASE]: 'inherit',
  [stylingCondition.DANGER]: theme('colors.signal.danger.text'),
  [stylingCondition.PRIMARY]: props => shadeColor(theme('colors.primary')(props), 1),
  [stylingCondition.SUCCESS]: theme('colors.signal.success.text'),
  [stylingCondition.WARNING]: theme('colors.signal.warning.text')
}

const getColor = props => {
  const color = COLORS[props.condition]
  return color || 'inherit'
}

const StyledSignalListItem = StyledLi.extend`
  && {
    color: ${props => getColor(props)};
    position: relative;

    > i,
    > svg {
      position: absolute;
      left: -1.6rem;
      text-align: left;
    }

    > svg {
      top: .2em;
    }
  }
`

StyledSignalListItem.propTypes = {
  condition: conditionPropTypes(COLORS)
}

export default StyledSignalListItem
