import _get from 'lodash/get'
import styled from 'styled-components'

import {design, scale, shadeColor, themeSelector} from '../utilStyles'

const ALLOWED_CONDITIONS = [
  design.condition.BASE,
  design.condition.DANGER,
  design.condition.SUCCESS,
  design.condition.WARNING
]

const COLORS = {
  [design.condition.DANGER]: themeSelector.color('signal.danger.text'),
  [design.condition.SUCCESS]: themeSelector.color('signal.success.text'),
  [design.condition.WARNING]: themeSelector.color('signal.warning.text'),
  [design.condition.BASE]: props => shadeColor(_get(props.theme, 'colors.paper'), 1)
}

const getColor = props => {
  const color = COLORS[props.condition]
  return color || shadeColor(_get(props.theme, 'colors.paper'), 1)
}

const StyledSignalBox = styled.div`
  && {
    background-color: ${props => getColor(props)};
    padding: ${scale.space(-1)};
    margin-bottom: ${scale.space(-1)};
    border-radius: ${themeSelector.radii('radii.regular')};
    ${({condition, theme}) =>
      condition !== 'base' &&
      `
      * {
        color: ${theme.colors.paper};
      }
    `}
    &:last-child {
      margin-bottom: 0;
    }
  }
`

StyledSignalBox.propTypes = {
  condition: design.oneOfPropTypeAndCompletelyMapped(ALLOWED_CONDITIONS, COLORS)
}

export {ALLOWED_CONDITIONS, StyledSignalBox as default}
