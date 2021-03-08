/* stylelint-disable no-descending-specificity */
import styled from 'styled-components'

import {AdminLink as StyledLink} from '../AdminLink'
import {theme} from '../utilStyles'

export const StyledBreadcrumbs = styled.div`
  background-color: ${theme.color('backgroundBreadcrumbs')};
  width: 100%;
  padding: .8rem 1.7rem;

  span:nth-child(even) {
    margin-left: .9rem;
    margin-right: .9rem;
  }
`

export const StyledBreadcrumbsLink = styled(StyledLink)`
  font-weight: ${theme.fontWeight('bold')};
  text-decoration: none;
  color: ${({active}) => active && theme.color('primary')};

  & * {
    font-weight: ${theme.fontWeight('bold')};
    text-decoration: none;
    color: ${({active}) => active && theme.color('primary')};
    margin-right: .5rem;
  }

  &:hover,
  &:hover *  {
    color: ${theme.color('secondaryLight')};
  }

  &:focus,
  &:active,
  &:focus *,
  &:active * {
    color: ${theme.color('primary')};
  }
`

// noinspection Stylelint
export const StyledBreadcrumbsTitle = styled.span`
  font-weight: ${theme.fontWeight('bold')};
  text-decoration: none;
  color: ${({active}) => active && theme.color('primary')};

  & * {
    font-weight: ${theme.fontWeight('bold')};
    text-decoration: none;
    color: ${({active}) => active && theme.color('primary')};
    margin-right: .5rem;
  }

  &:active * {
    color: ${theme.color('primary')};
  }
`
