import styled from 'styled-components'
import {Button, theme} from 'tocco-ui'

export const StyledSaveButton = styled(Button)`
  ${({hasErrors}) =>
    hasErrors &&
    `
    background-color: ${theme.color('paper')};
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
