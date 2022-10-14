import styled from 'styled-components'

import {scale} from '../utilStyles'

export const StyledInputWrapper = styled.div`
  width: calc(100% - 25px); // subtract extender width
`
export const StyledInputItemWrapper = styled.div`
  display: inline-block;
  width: 50%;

  * {
    text-align: center;
  }
`

export const StyledIconWrapper = styled.div`
  font-size: ${scale.font(-2.7)};
  display: flex;
  align-items: center;
  padding-left: ${scale.space(-0.5)};
  padding-right: ${scale.space(-0.9)};
`

export const StyledRange = styled.div`
  display: flex;
`

export const StyledInput = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

export const StyledExtender = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  left: 2px;
  z-index: 1;
`
