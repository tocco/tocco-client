import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {Button, theme, StyledScrollbar} from 'tocco-ui'

export const StyledNav = styled.nav`
  height: 100%;
  
  .StyledSearchBox {
    margin: 1.5rem 3rem 1.8rem 1.8rem;
  }
`

export const StyledMenuWrapper = styled.div`
  height: 100%;
  overflow: auto;
  padding-left: 2rem;

  ${StyledScrollbar}
  
  div > div:last-child {
    padding-bottom: 2rem;
  }
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
      color: ${theme.color('secondaryLight')};
    }
  
  &:focus {
     outline: none;
     font-weight: ${theme.fontWeight('bold')};
     color: ${theme.color('secondaryLight')};
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
  border-bottom: 3px solid ${theme.color('backgroundBody')};
  
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
    color: ${props => props.active ? theme.color('secondary') : theme.color('secondaryLight')};
    font-weight: ${theme.fontWeight('bold')};
    border-color: ${props => props.active ? theme.color('secondary') : 'transparent'};
    border-left: 0;
    border-right: 0;
    border-bottom: 0;
    
    &:hover {
      border-color: ${props => props.active ? theme.color('secondary') : theme.color('secondaryLight')};
      background-color: transparent;
      color: ${props => props.active ? theme.color('secondary') : theme.color('secondaryLight')};
    }
    
    &:focus {
      background-color: transparent;
    }
  }
`
