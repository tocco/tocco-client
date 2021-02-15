import styled from 'styled-components'
import {Button, scale, theme} from 'tocco-ui'

export const StyledForm = styled.form`
  display: grid;
  padding-bottom: ${scale.space(-0.5)};
  grid-template-columns: 100%;
  height: 100%;
  grid-template-rows: auto auto 1fr;
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
