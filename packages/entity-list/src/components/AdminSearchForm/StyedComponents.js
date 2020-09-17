import styled from 'styled-components'
import {StyledScrollbar, theme} from 'tocco-ui'
import Split from 'react-split'

export const StyledSplit = styled(Split)``

export const StyledSplitWrapper = styled.div`
  height: 100%;
`

export const StyledHeader = styled.div`
  background-color: ${theme.color('paper')};
  margin-bottom: 3px;
  display: flex;
  justify-content: flex-end;
  padding: 9px;
`

export const AdminSearchGrid = styled.div`
  height: 100%;
  overflow: hidden;

  ${StyledSplit} {
    height: calc(100% - 40px);
    display: flex;
    flex-direction: column;
  }
`

export const Box = styled.div`
  background-color: ${theme.color('paper')};
  overflow-y: auto;
  padding: .6rem 1rem 0 .6rem;
  ${StyledScrollbar}
`

export const StyledGutter = styled.div`
  background-color: ${theme.color('paper')};
  display: flex;
  padding-top: 3px;
  justify-content: center;
  align-items: center;
  height: calc(100% - 1px); //subtract border height from total height
  font-size: 20px;
  border-top: 1px solid ${theme.color('backgroundBody')};

  &:hover {
    cursor: row-resize;
  }
`
