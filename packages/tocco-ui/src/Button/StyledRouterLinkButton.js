import {Link} from 'react-router-dom'
import styled from 'styled-components'

import {buttonStyle} from './buttonStyle'

const StyledRouterLinkButton = styled(Link)`
  text-decoration: none;
  ${buttonStyle}
`

export default StyledRouterLinkButton
