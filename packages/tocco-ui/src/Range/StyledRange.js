import styled from 'styled-components'

import {scale} from '../utilStyles'

export const StyledInputWrapper = styled.div`
  width: calc(100% - 20px); // subtract extender width
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

export const StyledRange = styled.div`
  display: flex;
`

export const StyledInput = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: inherit;
`

export const StyledExtender = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  left: 2px;
  z-index: 1;
`
