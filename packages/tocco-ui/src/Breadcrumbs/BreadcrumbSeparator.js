import React from 'react'

import Icon from '../Icon'
import {StyledBreadcrumbSeparator} from './StyledBreadcrumbs'

const BreadcrumbSeparator = () => (
  <StyledBreadcrumbSeparator breakWords>
    <Icon icon="chevron-right" />
  </StyledBreadcrumbSeparator>
)

export default BreadcrumbSeparator
