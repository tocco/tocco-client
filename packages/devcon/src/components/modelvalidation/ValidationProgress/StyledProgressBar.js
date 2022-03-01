import styled from 'styled-components'
import {declareFont} from 'tocco-ui'

export const StyledProgressBar = styled.div`
  width: 100%;
  border: 1px solid #ddd;
  height: 20px;
  position: relative;
  margin: 1em 0;
`

export const StyledInnerProgress = styled.div`
  position: absolute;
  background-color: #ddd;
  height: 100%;
  width: ${props => props.percentage}%;
`

export const StyledProgressText = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  text-align: center;

  && {
    ${declareFont()}
  }
`
