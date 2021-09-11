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

export const StyledStatementHeader = styled.span`
  grid-column: 1 / 3;
  ${props => props.expandable && 'cursor: pointer;'}

  && {
    ${declareFont()}
  }
`

export const StyledStatement = styled.span`
  grid-column: 1 / 3;
  margin-top: 1em;

  && {
    ${declareFont()}
  }
`

export const StyledTime = styled.span`
  grid-row-start: 1;
  grid-column-start: 3;
  text-align: right;

  && {
    ${declareFont()}
  }
`

export const StyledElapsedContainer = styled.span`
  grid-column-start: 3;
  text-align: right;
  margin-top: 1em;

  && {
    ${declareFont()}
  }
`

const getBackgroundColor = elapsed => {
  if (elapsed >= 1000) {
    return '#f00'
  }
  if (elapsed >= 500) {
    return '#ff8c00'
  }
  if (elapsed >= 100) {
    return '#ff0'
  }
  return '#dedede'
}

export const StyledElapsed = styled.span`
  background-color: ${props => getBackgroundColor(props.elapsed)};
  border-radius: 5px;
  padding: .5em;
`
