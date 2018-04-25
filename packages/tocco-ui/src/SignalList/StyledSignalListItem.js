import {theme} from 'styled-system'

import {StyledIcon} from '../Icon'
import {StyledLi} from '../Typography'
import {stylingCondition} from '../utilStyles'

const StyledSignalListItem = StyledLi.extend`
  && {
  color: ${props => getColor(props)}
  position: relative;

    ${StyledIcon} {
      position: absolute;
      left: -1.6rem;
      text-align: left;
    }
  }
`

const getColor = props => {
  switch (props.condition) {
    case stylingCondition.DANGER:
      return theme('colors.signal.danger')(props)
    case stylingCondition.SUCCESS:
      return theme('colors.signal.success')(props)
    case stylingCondition.WARNING:
      return theme('colors.signal.warning')(props)
    case stylingCondition.PRIMARY:
      return theme('colors.primary.line.1')(props)
    case stylingCondition.Base:
      return 'inherit'
  }
}

export default StyledSignalListItem
