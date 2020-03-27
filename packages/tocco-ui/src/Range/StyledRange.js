import styled from 'styled-components'
import _get from 'lodash/get'

import {scale, shadeColor} from '../utilStyles'
import {StyledButton} from '../Ball/StyledBall'
import {StyledSpan} from '../Typography'

const StyledRange = styled.div`
  display: flex;

  .input {
    flex: 1;

    ${StyledSpan} {
      position: absolute;
      display: inline-block;
      font-weight: bold;
      min-width: 3rem;
      top: ${scale.space(-0.5)};
    }

    ${StyledButton} {
      position: relative;
      left: 2.7rem;
    }
  }

  .extender {
    display: flex;
    align-items: flex-start;
    margin-top: 1px;
  }
`

export const StyledInputWrapper = styled.div`
  width: 100%;
`

export const StyledInputItemWrapper = styled.div`
  position: relative;
`

export const StyledEditableValue = styled.div`
  background-color: ${props => shadeColor(_get(props.theme, 'colors.paper'), 1)};
  width: 15rem;
  display: inline-block;
  padding-left: ${scale.space(-0.5)};
  margin-top: ${scale.space(-1)};
  margin-left: 3.2rem;
`

export default StyledRange
