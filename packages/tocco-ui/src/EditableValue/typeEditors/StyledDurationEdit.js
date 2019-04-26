import styled from 'styled-components'
import _get from 'lodash/get'

import {
  scale,
  shadeColor
} from '../../utilStyles'
import {
  StyledInputCss
} from '../StyledEditableValue'

const StyledDurationEdit = styled.input`
  && {
    ${StyledInputCss}
    flex-grow: 0;
    min-width: 1ch;
    border-bottom: 1px solid ${props => shadeColor(_get(props.theme, 'colors.paper'), 2)};
  }
`

const StyledDurationEditUnit = styled.span`
  && {
    line-height: 1;
    border-bottom: 1px solid transparent;

    &:not(:last-child) {
      margin-right: ${scale.space(-1)};
    }
  }
`

const StyledDurationEditShadow = styled.span`
  && {
    position: absolute;
    border: 1px solid transparent;
    z-index: -1;
  }
`

export {
  StyledDurationEditShadow,
  StyledDurationEditUnit,
  StyledDurationEdit
}
