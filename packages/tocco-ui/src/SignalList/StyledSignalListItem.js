import {theme} from 'styled-system'

import {StyledLi} from '../Typography'
import {
  conditionPropTypes,
  stylingCondition
} from '../utilStyles'

const COLORS = {
  [stylingCondition.BASE]: 'inherit',
  [stylingCondition.DANGER]: theme('colors.signal.danger'),
  [stylingCondition.PRIMARY]: theme('colors.primary.line.1'),
  [stylingCondition.SUCCESS]: theme('colors.signal.success'),
  [stylingCondition.WARNING]: theme('colors.signal.warning')
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
