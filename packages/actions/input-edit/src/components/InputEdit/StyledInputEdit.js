import styled from 'styled-components'
import {theme} from 'tocco-ui'

export const StyledPaneWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`

export const StyledListView = styled.div`
  display: grid;
  grid-template-rows: [action-start] auto [table-start] minmax(0, 1fr);
  height: 100%;
  width: 100%;
`

export const StyledActionsWrapper = styled.div`
  display: flex;
  background-color: ${theme.color('paper')};
  margin-bottom: 3px;
  /* remove left padding on widget */
  padding: ${({env}) => (env === 'widget' ? '0 0 8px 0' : '0 8px 8px')};
  grid-row-start: action-start;
  flex-wrap: wrap;

  & > * {
    margin-top: 8px;
  }
`
export const StyledListWrapper = styled.div`
  grid-row-start: table-start;
`
