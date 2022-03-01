import styled from 'styled-components'
import {declareFont} from 'tocco-ui'

const BORDER_COLOR = {
  ERROR: '#a00'
}

export const StyledLogTable = styled.div`
  display: grid;
  gap: 1px;
`

export const StyledLogEntry = styled.div`
  display: grid;
  height: fit-content;
  grid-template-columns: repeat(3, 1fr);
  padding: 1em;
  ${props => `border: 1px solid ${BORDER_COLOR[props.level] || '#ddd'};`}
`

export const StyledMessage = styled.span`
  grid-column: 1 / 3;
  ${props => props.expandable && 'cursor: pointer;'}

  && {
    ${declareFont()}
  }
`

export const StyledTime = styled.span`
  grid-column-start: 3;
  text-align: right;

  && {
    ${declareFont()}
  }
`

export const StyledExceptionDetails = styled.div`
  margin-top: 1em;
`

export const StyledDetailMessage = styled.div`
  margin-bottom: 1em;

  && {
    ${declareFont()}
  }
`

export const StyledStackTrace = styled.div`
  && {
    ${declareFont()}
  }
`
