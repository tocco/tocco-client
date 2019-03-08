import {theme} from 'styled-system'
import styled from 'styled-components'

import {StyledSignalListItem} from '../SignalList'
import {
  design,
  scale,
  shadeColor
} from '../utilStyles'

const ALLOWED_CONDITIONS = [
  design.condition.BASE,
  design.condition.DANGER,
  design.condition.SUCCESS,
  design.condition.WARNING
]

const COLORS = {
  [design.condition.DANGER]: theme('colors.signal.danger.paper'),
  [design.condition.SUCCESS]: theme('colors.signal.success.paper'),
  [design.condition.WARNING]: theme('colors.signal.warning.paper'),
  [design.condition.BASE]: props => shadeColor(theme('colors.paper')(props), 1)
}

const getColor = props => {
  const color = COLORS[props.condition]
  return color || shadeColor(theme('colors.paper')(props), 1)
}

const StyledSignalBox = styled.div`
  && {
    background-color: ${props => getColor(props)};
    padding: ${props => scale.space(props, -1)};
    margin-bottom: ${props => scale.space(props, -1)};
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
  condition: design.oneOfPropTypeAndCompletelyMapped(ALLOWED_CONDITIONS, COLORS)
}

export {
  ALLOWED_CONDITIONS,
  StyledSignalBox as default
}
