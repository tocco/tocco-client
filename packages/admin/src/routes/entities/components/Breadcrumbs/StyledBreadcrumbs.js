import styled from 'styled-components'
import {theme} from 'tocco-ui'

import {StyledLink} from '../../../../components/StyledLink'

export const StyledBreadcumbs = styled.div`
  background-color: ${theme.color('backgroundBreadcrumbs')};
  width: 100%;
  padding: 1.3rem 1.7rem;
  margin-bottom: 6px;
  
  span:nth-child(even) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
  
  span:last-child a {
    color: ${theme.color('primary')}
  }
`

export const StyledBreadcrumbsLink = styled(StyledLink)`
  font-weight: ${theme.fontWeight('bold')};
  text-decoration: none;
  
  * {
    margin-right: .5rem;
  }
  
  &:hover {
    color: ${theme.color('secondaryLight')}
  }
  
  &:focus, &:active {
    color: ${theme.color('primary')}
  }
`
