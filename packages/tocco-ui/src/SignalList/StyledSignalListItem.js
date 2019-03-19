import styled from 'styled-components'
import _get from 'lodash/get'

import {StyledLi} from '../Typography'
import {
  shadeColor,
  design
} from '../utilStyles'

const COLORS = {
  [design.condition.BASE]: 'inherit',
  [design.condition.DANGER]: props => _get(props.theme, 'colors.signal.danger.text'),
  [design.condition.PRIMARY]: props => shadeColor(_get(props.theme, 'colors.primary'), 1),
  [design.condition.SUCCESS]: props => _get(props.theme, 'colors.signal.success.text'),
  [design.condition.WARNING]: props => _get(props.theme, 'colors.signal.warning.text')
}

const getColor = props => {
  const color = COLORS[props.condition]
  return color || 'inherit'
}

const StyledSignalListItem = styled(StyledLi)`
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
  condition: design.conditionPropTypes(COLORS)
}

export default StyledSignalListItem
