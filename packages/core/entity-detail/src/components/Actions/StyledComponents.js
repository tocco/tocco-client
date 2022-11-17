import styled from 'styled-components'
import {Button, theme} from 'tocco-ui'

export const StyledSaveButton = styled(Button)`
  border: 1px solid transparent;
  ${({hasErrors, theme}) =>
    hasErrors &&
    `
      border-color: ${theme.colors.signal.danger.text};
      background-color: ${theme.colors.paper};
      &:hover {
        background-color: ${theme.colors.signal.danger.text};
        color: ${theme.colors.paper};
      }
  `}
  display: block;
`

export const StyledActionSpan = styled.span`
  cursor: pointer;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    color: ${theme.color('secondaryLight')};
  }
  ${({marked, theme}) => marked && `color: ${theme.colors.secondary};`}
`
