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
    width: 100%;
    border-bottom: 1px solid ${props => shadeColor(_get(props.theme, 'colors.paper'), 2)};
  }
`

const StyledDurationEditUnit = styled.span`
  && {
    margin-left: ${scale.space(-2)};

    &:not(:last-child) {
      margin-right: ${scale.space(-1)};
    }
  }
`

export {
  StyledDurationEditUnit,
  StyledDurationEdit
}
