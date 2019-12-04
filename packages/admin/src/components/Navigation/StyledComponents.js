import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {Button, theme} from 'tocco-ui'

export const StyledNav = styled.nav`
  height: 100%;
`

export const StyledMenuWrapper = styled.div`
  height: 100%;
  overflow: auto;
  padding-left: 2rem;
  
  div > div:last-child {
    padding-bottom: 2rem;
  }

  ::-webkit-scrollbar {
      width: 10px;
  }
   
  ::-webkit-scrollbar-thumb {
    background-color: ${theme.color('text')};
    
    &:hover {
      background-color: ${theme.color('primaryBlue')};
    }
  }
  
  scrollbar-color: ${theme.color('text')} transparent; // Firefox workaround
  scrollbar-width: thin;
`

export const StyledMenuEntry = styled.span`
   color: ${theme.color('text')};
   font-weight: ${theme.fontWeight('bold')};
`

export const StyledMenuLink = styled(Link)`
  color: ${theme.color('text')};
  text-decoration: none;
  padding-left: 1.3rem;
  
  &:hover {
      color: ${theme.color('secondaryBlue')};
    }
  
  &:focus {
     outline: none;
    }
  
  &.active {
      text-decoration: underline;
    }
`

export const StyledTabsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center; 
  margin-bottom: 10px;
  border-bottom: 3px solid ${theme.color('background')};
  
  &:focus {
    background-color: transparent;
  }
  
  span {
    padding-top: .4rem;
    padding-bottom: .4rem;
  }
`

export const StyledNavButton = styled(Button)`
  && {
    flex: 1;
    justify-content: center;
    border-radius: 0;
    margin: 5px;
    border-top: 5px solid;
    color: ${props => props.active ? theme.color('primaryBlue') : theme.color('secondaryBlue')};
    font-weight: ${theme.fontWeight('bold')};
    border-color: ${props => props.active ? theme.color('primaryBlue') : 'transparent'};
    
    &:hover {
      border-color: ${props => props.active ? theme.color('primaryBlue') : theme.color('secondaryBlue')};
      background-color: transparent;
      color: ${props => props.active ? theme.color('primaryBlue') : theme.color('secondaryBlue')};
    }
    
    &:focus {
      background-color: transparent;
    }
  }
`
