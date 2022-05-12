/* stylelint-disable no-descending-specificity */
import React from 'react'
import styled from 'styled-components'

import {StyledSpan} from '../Typography'
import {theme} from '../utilStyles'

export const StyledBreadcrumbs = styled.div`
  background-color: ${props => props.backgroundColor || theme.color('backgroundBreadcrumbs')(props)};
  width: 100%;
  padding: 0.8rem 1.7rem;
  position: relative;
  z-index: 2; // higher than StyledTether to prevent cover on scroll
`

export const StyledBreadcrumbsLink = styled(({component, ...props}) => React.cloneElement(component, props))`
  font-weight: ${theme.fontWeight('bold')};
  text-decoration: none;
  color: ${({active}) => active && theme.color('primary')};
  cursor: pointer;

  & * {
    font-weight: ${theme.fontWeight('bold')};
    text-decoration: none;
    color: ${({active}) => active && theme.color('primary')};
    margin-right: 0.5rem;
  }

  &:hover,
  &:hover * {
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
    margin-right: 0.5rem;
  }

  &:active * {
    color: ${theme.color('primary')};
  }
`

export const StyledBreadcrumbSeparator = styled(StyledSpan)`
  margin-left: 0.9rem;
  margin-right: 0.9rem;
`
