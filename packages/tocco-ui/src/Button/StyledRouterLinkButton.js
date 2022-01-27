import {Link} from 'react-router-dom'
import styled from 'styled-components'

import {buttonStyle} from './buttonStyle'

const StyledRouterLinkButton = styled(Link)`
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: none; // nice2 reset
  }
  ${buttonStyle}
`

export default StyledRouterLinkButton
