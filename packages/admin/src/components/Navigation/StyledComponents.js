import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const StyledSearch = styled.input`
  border-radius: 20px;
  border: 0px;
  width: 90%;
  font-size: 1.2rem;
  padding: 4px 7px;
  :focus {
      outline: none;
  }
  margin-bottom: 5px;
`

export const StyledNav = styled.nav`
  height: 100%;
`

export const StyledMewnuWrapper = styled.div`
  height: 100%;
  overflow: auto;
  ::-webkit-scrollbar {
      width: 5px;
  }
   
  ::-webkit-scrollbar-thumb {
    background-color: #878787;
  }
  
  scrollbar-color: #878787 #253653; // Firefox workaround
  scrollbar-width: thin;
`

export const StyledMenuEntry = styled.span`
   color: #c5cbd4;
   font-weight: bold;
`

export const StyledMenuLink = styled(Link)`
  color: #c5cbd4;
  text-decoration: none;
  
  &:hover {
      color: #555;
    }
  
  &:focus {
     text-decoration: underline;
      outline: none;
    }
  
  &.active {
      text-decoration: underline;
    }
`
