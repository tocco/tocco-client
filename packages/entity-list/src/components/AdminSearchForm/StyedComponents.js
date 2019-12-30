import styled from 'styled-components'
import {StyledScrollbar, theme} from 'tocco-ui'

export const AdminSearchGrid = styled.div`
   height: 100%;
  > div {
    height: 100%;
  }
  overflow: hidden;
`

export const Box = styled.div`
  background-color: ${theme.color('paper')};
  overflow-y: auto;
  padding: .6rem 1rem 0 1rem;
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
