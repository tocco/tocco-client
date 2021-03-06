import styled from 'styled-components'
import {Button, scale, theme, StyledScrollbar} from 'tocco-ui'

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding-bottom: ${scale.space(-0.5)};
  height: 100%;
  overflow-y: auto;
  ${StyledScrollbar}
`

export const StyledButton = styled(Button)`
  ${({hasErrors}) => hasErrors && `
    background-color: ${theme.color('paper')};
  `};
`

export const StyledActionWrapper = styled.div`
  ${StyledButton} {
    width: 100%;
    max-width: fit-content;
    justify-content: center;
    box-sizing: border-box;

    > * {
      overflow: hidden;
    }
  }
`

export const StyledActionSpan = styled.span`
  cursor: pointer;
`
