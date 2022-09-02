import {Link} from 'react-router-dom'
import styled from 'styled-components'

import {StyledFontAwesomeAdapterWrapper} from '../Icon'
import {scale} from '../utilStyles'
import {buttonStyle} from './buttonStyle'

const StyledRouterLinkButton = styled(Link)`
  text-decoration: none;

  ${StyledFontAwesomeAdapterWrapper} {
    padding-right: ${scale.space(-0.5)};
  }

  &:hover,
  &:focus {
    text-decoration: none; // nice2 reset
  }
  ${buttonStyle}
`

export default StyledRouterLinkButton
