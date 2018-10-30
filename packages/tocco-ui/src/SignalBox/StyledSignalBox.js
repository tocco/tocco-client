import {theme} from 'styled-system'
import styled from 'styled-components'

import {StyledSignalListItem} from '../SignalList'
import {
  oneOfPropTypeAndCompletelyMapped,
  stylingCondition
} from '../utilStyles'

const ALLOWED_CONDITIONS = [
  stylingCondition.BASE,
  stylingCondition.DANGER,
  stylingCondition.SUCCESS,
  stylingCondition.WARNING
]

const COLORS = {
  [stylingCondition.DANGER]: theme('colors.signal.dangerBg'),
  [stylingCondition.SUCCESS]: theme('colors.signal.successBg'),
  [stylingCondition.WARNING]: theme('colors.signal.warningBg'),
  [stylingCondition.BASE]: theme('colors.base.fill.1')
}

const getColor = props => {
  const color = COLORS[props.condition]
  return color || theme('colors.base.fill.1')
}

const StyledSignalBox = styled.div`
  && {
    background-color: ${props => getColor(props)};
    padding: ${theme('space.5')};
    margin-bottom: ${theme('space.5')};
    border-radius: ${theme('radii')};

    &:last-child {
      margin-bottom: 0;
    }

    ${StyledSignalListItem} {
      color: inherit;
    }
  }
`

StyledSignalBox.propTypes = {
  condition: oneOfPropTypeAndCompletelyMapped(ALLOWED_CONDITIONS, COLORS)
}

export {
  ALLOWED_CONDITIONS,
  StyledSignalBox as default
}
