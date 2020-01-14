import styled from 'styled-components'
import {StyledScrollbar, theme} from 'tocco-ui'
import Split from 'react-split'

export const StyledSplit = styled(Split)``

export const StyledHeader = styled.div`
  background-color: ${theme.color('paper')};
  margin-bottom: 3px;
  display:flex;
  justify-content: flex-end;
  padding: 9px;
`

export const AdminSearchGrid = styled.div`
   height: 100%;
 
  ${StyledSplit} {
    height: 100%;
  }
  overflow: hidden;
`

export const Box = styled.div`
  background-color: ${theme.color('paper')};
  overflow-y: auto;
  padding: .6rem 1rem 0 .6rem;
  ${StyledScrollbar}
`

export const StyledGutter = styled.div`
   background-color: ${theme.color('paper')};
   &:hover {
    cursor:row-resize;
   }
   display: flex;
   justify-content: center;
   align-items: center;
   color: ${theme.color('text')};
   font-size: 25px;
   border-top: 3px solid ${theme.color('backgroundBody')};
`
