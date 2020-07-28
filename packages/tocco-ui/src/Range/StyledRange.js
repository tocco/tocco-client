import styled from 'styled-components'

import {scale} from '../utilStyles'

export const StyledInputWrapper = styled.div`
  width: 100%;
`
export const StyledInputItemWrapper = styled.div`
  display: inline-block;
  width: 50%;

  * {
    line-height: unset !important;
    text-align: center;
  }
`

export const StyledIconWrapper = styled.div`
  font-size: ${scale.font(-2.7)};
  display: flex;
  align-items: center;
`

const StyledRange = styled.div`
  display: flex;

  .input {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .extender {
    display: flex;
    align-items: center;
    margin-left: -20px;
  }
`

export default StyledRange
