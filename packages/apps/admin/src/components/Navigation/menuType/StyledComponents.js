import {Link} from 'react-router-dom'
import styled, {css} from 'styled-components'
import {theme, scale, isTouchDevice} from 'tocco-ui'

const secondaryLight = theme.color('secondaryLight')

export const StyledMenuLink = styled(Link)`
  color: ${theme.color('text')};
  text-decoration: none;

  &:hover {
    color: ${theme.color('secondaryLight')};
    text-decoration: none; // nice2 reset
  }

  &:focus {
    outline: none;
    text-decoration: none; // nice2 reset
    font-weight: ${theme.fontWeight('bold')};
    color: ${secondaryLight};
  }

  &.active {
    text-decoration: underline;
  }
`

export const StyledIconLink = styled(Link)`
  /* Disable open new tab feature on mobile */
  ${isTouchDevice &&
  css`
    display: none;
  `}
  opacity: 0;
  color: ${theme.color('text')};
  text-decoration: none;
  position: relative;
  margin-left: ${scale.space(-1)};

  &:hover,
  &:focus {
    color: ${theme.color('secondaryLight')};
  }

  &:focus {
    opacity: 1;
    outline: none;
  }
`

export const StyledMenuLinkWrapper = styled.span`
  display: inline-block;
  padding-top: ${scale.space(-2)};
  padding-bottom: ${scale.space(-2)};

  &:hover ${StyledIconLink} {
    opacity: 1;
  }
`

export const StyledTogglerButton = styled.button`
  display: none;
  background: transparent;
  border: transparent;
  outline: none;
  padding: 0;
  cursor: pointer;

  /* Always show expand/collapse icon on mobile */
  ${isTouchDevice &&
  css`
    display: block;
  `}
  margin-left: ${scale.space(-1)};

  &:hover {
    color: ${theme.color('secondaryLight')};
  }
`

export const StyledMenuEntry = styled.span`
  color: ${theme.color('text')};
  font-weight: ${theme.fontWeight('bold')};
  margin-bottom: ${scale.space(-1.2)};
  margin-top: ${scale.space(-1.2)};
  display: flex;

  &:hover {
    ${({onClick}) => (onClick ? 'cursor: pointer;' : 'cursor: auto;')}

    ${StyledTogglerButton} {
      display: block;
    }
  }
`

export const StyledMenuIconWrapper = styled.span`
  margin-right: ${scale.space(-1.2)};
`

export const StyledMenuChildrenWrapper = styled.div`
  display: ${({isOpen}) => (isOpen ? 'block' : 'none')};
`
