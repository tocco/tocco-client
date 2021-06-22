import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {Button, theme, StyledScrollbar, scale} from 'tocco-ui'

const secondary = theme.color('secondary')
const secondaryLight = theme.color('secondaryLight')

export const StyledNav = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: column;

  .StyledSearchBox {
    margin: 1.5rem 3rem 1.8rem 1.8rem;
  }
`

export const StyledMenuWrapper = styled.div`
  height: 100%;
  overflow: auto;
  padding: ${scale.space(0.6)} 0 0 ${scale.space(0.6)};
  ${StyledScrollbar}
`

export const StyledMenuEntry = styled.span`
  color: ${theme.color('text')};
  font-weight: ${theme.fontWeight('bold')};
`

export const StyledMenuLink = styled(Link)`
  color: ${theme.color('text')};
  text-decoration: none;

  &:hover {
    color: ${theme.color('secondaryLight')};
  }

  &:focus {
    outline: none;
    font-weight: ${theme.fontWeight('bold')};
    color: ${secondaryLight};
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

export const StyledNavSwitchButton = styled(Button)`
  font-size: ${scale.font(0)};
  justify-content: center;
  border-radius: 0;
  margin: 12px 5px 5px;

  &:hover {
    background-color: transparent;
    color: ${secondaryLight};
  }
`

export const StyledNavButton = styled(Button)`
  overflow: hidden;
  flex: ${({narrow}) => narrow ? 0.2 : 1};
  justify-content: center;
  border-radius: 0;
  margin: 5px;
  border-top: 5px solid ${({active}) => active ? secondary : 'transparent'};
  color: ${({active}) => active ? secondary : secondaryLight};
  font-weight: ${theme.fontWeight('bold')};

  &:hover {
    border-color: ${({active}) => active ? secondary : secondaryLight};
    background-color: transparent;
    color: ${({active}) => active ? secondary : secondaryLight};
  }

  &:focus {
    background-color: transparent;
  }

  & > * {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const StyledSearchBoxWrapper = styled.div`
  height: 50px;
  padding-bottom: ${scale.space(-0.5)};
`
