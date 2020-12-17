import styled from 'styled-components'
import {StyledScrollbar, scale} from 'tocco-ui'

export const StyledTitleWrapper = styled.div`
  padding-bottom: ${scale.space(0.5)};
  grid-row-start: title;
`

export const StyledMessageWrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  grid-row-start: message;
  ${StyledScrollbar}

  ${StyledScrollbar} {
    padding-right: 1rem;
  }
`
