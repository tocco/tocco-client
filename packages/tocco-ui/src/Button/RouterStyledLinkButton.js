import {Link} from 'react-router-dom'
import styled from 'styled-components'

import {buttonStyle} from './buttonStyle'

const RouterStyledLinkButton = styled(Link)`
  text-decoration: none;
  ${buttonStyle}
`

export default RouterStyledLinkButton
