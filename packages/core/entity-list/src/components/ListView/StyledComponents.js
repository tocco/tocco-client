import styled from 'styled-components'
import {theme} from 'tocco-ui'

export const StyledListWrapper = styled.div`
  grid-row-start: table-start;
  ${({tableMinHeight}) => tableMinHeight && `min-height: ${tableMinHeight};`}
`

export const StyledActionWrapper = styled.div`
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

export const StyledListView = styled.div`
  display: grid;
  grid-template-rows: [action-start] auto [table-start] minmax(0, 1fr);
  height: 100%;
`
