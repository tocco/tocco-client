import styled from 'styled-components'
import _get from 'lodash/get'

import {scale, shadeColor} from '../utilStyles'
import {StyledButton} from '../Ball/StyledBall'
import {StyledSpan} from '../Typography'

export const StyledInputWrapper = styled.div`
  width: 100%;

  ${StyledButton} {
    margin-right: ${scale.space(-2)};
  }
`

const StyledRange = styled.div`
  display: flex;

  .input {
    flex: 1;

    ${StyledSpan} {
      position: absolute;
      display: inline-block;
      min-width: 3rem;
      top: ${scale.space(-0.2)};
    }
  }

  .extender {
    display: flex;
    align-items: flex-start;
    margin-top: 1px;
  }
`

export const StyledInputItemWrapper = styled.div`
  position: relative;
`

export const StyledEditableValue = styled.div`
  border: 1px solid ${props => shadeColor(_get(props.theme, 'colors.paper'), 4)};
  width: 15rem;
  display: inline-block;
  padding: ${scale.space(-2.5)} 0 ${scale.space(-2.5)} ${scale.space(-0.5)};
  margin-top: ${scale.space(-1)};
  margin-left: 3.2rem;
`

export default StyledRange
