import styled from 'styled-components'

import {scale} from '../utilStyles'

export const StyledInputWrapper = styled.div`
  width: 100%;
`
export const StyledInputItemWrapper = styled.div`
  display: inline-block;
  width: 100%;

  * {
    line-height: unset !important;
  }
`

const StyledRange = styled.div`
  display: flex;

  .input {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    ${/* sc-selector */StyledInputItemWrapper}:nth-child(3) {
      margin-right: ${scale.space(0)};

      * {
        text-align: right;
      }
    }
  }

  .extender {
    display: flex;
    align-items: center;
  }
`

export default StyledRange
