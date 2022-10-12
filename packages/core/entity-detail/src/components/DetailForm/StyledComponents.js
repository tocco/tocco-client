import styled from 'styled-components'
import {Button, scale, themeSelector, StyledScrollbar} from 'tocco-ui'

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding-bottom: ${scale.space(-0.5)};
  height: 100%;
  overflow-y: auto;
  ${StyledScrollbar}
`

export const StyledSaveButton = styled(Button)`
  ${({hasErrors}) =>
    hasErrors &&
    `
    background-color: ${themeSelector.color('paper')};
  `}
  display: block;
`

export const StyledActionWrapper = styled.div`
  ${StyledSaveButton} {
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
