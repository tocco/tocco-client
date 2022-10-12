import styled from 'styled-components'
import {Button, themeSelector} from 'tocco-ui'

export const StyledSaveButton = styled(Button)`
  ${({hasErrors, theme}) =>
    hasErrors &&
    `
      box-shadow: 0 0 0 1px ${theme.colors.signal.danger.text};
      background-color: ${theme.colors.paper};
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
    color: ${themeSelector.color('secondaryLight')};
  }
  ${({marked, theme}) => marked && `color: ${theme.colors.secondary};`}
`
