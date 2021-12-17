/* stylelint-disable no-descending-specificity */
import styled from 'styled-components'
import {theme} from 'tocco-ui'

import {StyledLink} from '../../../../components/StyledLink'

export const StyledBreadcumbs = styled.div`
  background-color: ${theme.color('backgroundBreadcrumbs')};
  width: 100%;
  padding: .8rem 1.7rem;

  span:nth-child(even) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
`

export const StyledBreadcrumbsLink = styled(StyledLink)`
  font-weight: ${theme.fontWeight('bold')};
  text-decoration: none;
  color: ${props => props.active && theme.color('primary')};

  & * {
    font-weight: ${theme.fontWeight('bold')};
    text-decoration: none;
    color: ${props => props.active && theme.color('primary')};
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
  color: ${props => props.active && theme.color('primary')};

  & * {
    font-weight: ${theme.fontWeight('bold')};
    text-decoration: none;
    color: ${props => props.active && theme.color('primary')};
    margin-right: .5rem;
  }

  &:active * {
    color: ${theme.color('primary')};
  }
`