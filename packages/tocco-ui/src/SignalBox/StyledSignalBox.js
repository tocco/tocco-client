import {theme} from 'styled-system'
import styled from 'styled-components'

import {StyledSignalListItem} from '../SignalList'
import {
  oneOfPropTypeAndCompletelyMapped,
  shadeColor,
  spaceScale,
  stylingCondition
} from '../utilStyles'

const ALLOWED_CONDITIONS = [
  stylingCondition.BASE,
  stylingCondition.DANGER,
  stylingCondition.SUCCESS,
  stylingCondition.WARNING
]

const COLORS = {
  [stylingCondition.DANGER]: theme('colors.signal.danger.paper'),
  [stylingCondition.SUCCESS]: theme('colors.signal.success.paper'),
  [stylingCondition.WARNING]: theme('colors.signal.warning.paper'),
  [stylingCondition.BASE]: props => shadeColor(theme('colors.paper')(props), 1)
}

const getColor = props => {
  const color = COLORS[props.condition]
  return color || shadeColor(theme('colors.paper')(props), 1)
}

const StyledSignalBox = styled.div`
  && {
    background-color: ${props => getColor(props)};
    padding: ${props => spaceScale(props, -1)};
    margin-bottom: ${props => spaceScale(props, -1)};
    border-radius: ${theme('radii.regular')};

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
