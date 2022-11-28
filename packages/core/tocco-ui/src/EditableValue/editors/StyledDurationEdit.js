import _get from 'lodash/get'
import styled from 'styled-components'

import {generateDisabledShade, scale, theme} from '../../utilStyles'
import {StyledInputCss} from '../StyledEditableValue'

const StyledDurationEdit = styled.input`
  &&&& {
    ${StyledInputCss}
    flex-grow: 0;
    width: ${({width}) => width}px;
    min-width: 2.5ch;
  }
`

const StyledDurationEditFocusable = styled.label`
  &&& {
    align-items: center;
    display: flex;
    flex-wrap: nowrap;
    margin-bottom: 0; /* reset bootstrap */
    margin-left: ${scale.space(1)};

    &:first-child {
      margin-left: 0;
    }

    > span {
      color: ${props =>
        props.immutable ? generateDisabledShade(_get(props.theme, 'colors.text')) : theme.color('text')};
      cursor: ${props => (props.immutable ? 'not-allowed' : 'default')};
    }
  }
`

export {StyledDurationEditFocusable, StyledDurationEdit}
