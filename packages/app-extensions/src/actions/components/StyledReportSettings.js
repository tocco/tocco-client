import styled from 'styled-components'
import {scale, theme, StyledButton} from 'tocco-ui'

export const StyledReportSettings = styled.div`
  && {
    > div:first-of-type {
      margin-bottom: 10px;
    }
  }
`

export const StyledStickyButtons = styled.div`
  position: sticky;
  bottom: 0;
  padding-top: ${scale.space(0)};
  background-color: ${theme.color('paper')};
  z-index: 1;
  display: flex;
  justify-content: flex-end;

  ${/* sc-selector */StyledButton}:last-child {
    margin-right: 0;
  }
`
