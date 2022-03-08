import styled from 'styled-components'
import {scale, theme, StyledButton} from 'tocco-ui'

export const StyledAdvancedSearch = styled.div`
  && {
    > *:not(:last-child) {
      margin-bottom: ${scale.space(-1)};
    }
  }
`

export const StyledAdvancedSearchButtonWrapper = styled.div`
  background: ${theme.color('paper')};
  padding-top: ${scale.space(0.5)};
  z-index: 1;
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: flex-end;

  ${StyledButton} {
    margin-right: 0;
  }
`
