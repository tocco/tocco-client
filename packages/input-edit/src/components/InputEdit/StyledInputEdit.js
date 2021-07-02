import styled, {css} from 'styled-components'
import {scale, StyledScrollbar, theme} from 'tocco-ui'

export const StyledPaneWrapper = styled.div`
  display: flex;
  height: 100%;
`

const sharedSplitPaneStyles = css`
  background-color: ${theme.color('paper')};
  padding-top: ${scale.space(-1)};
  ${StyledScrollbar}
`

export const StyledPanelWrapperLeft = styled.div`
  && {
    min-width: 265px;
    width: 16%;
    margin-right: 1rem;
    ${sharedSplitPaneStyles}
  }
`

export const StyledPanelWrapperRight = styled.div`
  && {
    width: 100%;
    display: flex;
    flex-direction: column;
    ${sharedSplitPaneStyles}
  }
`

export const StyledInputEditSearchWrapper = styled.div`
  margin-bottom: ${scale.space(0)};
`

export const StyledLeftPane = styled.div`
  padding: 0 ${scale.space(-1)};
`

export const StyledActionsWrapper = styled.div`
  border-bottom: 3px solid ${theme.color('backgroundBody')};
  padding: 0 8px 8px;
`
