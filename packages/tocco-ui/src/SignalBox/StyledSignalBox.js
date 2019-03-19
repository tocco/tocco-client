import _get from 'lodash/get'
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
  [design.condition.DANGER]: props => _get(props.theme, 'colors.signal.danger.paper'),
  [design.condition.SUCCESS]: props => _get(props.theme, 'colors.signal.success.paper'),
  [design.condition.WARNING]: props => _get(props.theme, 'colors.signal.warning.paper'),
  [design.condition.BASE]: props => shadeColor(_get(props.theme, 'colors.paper'), 1)
}

const getColor = props => {
  const color = COLORS[props.condition]
  return color || shadeColor(_get(props.theme, 'colors.paper'), 1)
}

const StyledSignalBox = styled.div`
  && {
    background-color: ${props => getColor(props)};
    padding: ${props => scale.space(props.theme, -1)};
    margin-bottom: ${props => scale.space(props.theme, -1)};
    border-radius: ${props => _get(props.theme, 'radii.regular')};

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
