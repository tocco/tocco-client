import styled from 'styled-components'
import {StyledButton, scale} from 'tocco-ui'

export const StyledSectionWrapper = styled.div`
  padding-top: ${scale.space(0.6)};
`

export const StyledButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  ${StyledButton} {
    margin-right: 0;
  }
`
