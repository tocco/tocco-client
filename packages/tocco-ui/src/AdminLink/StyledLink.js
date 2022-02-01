import {Link} from 'react-router-dom'
import styled from 'styled-components'

import {linkStyle} from './linkStyle'

export default styled(Link).withConfig({
  // do not forward `neutral` prop to HTML
  shouldForwardProp: (prop, defaultValidatorFn) => !['neutral'].includes(prop) && defaultValidatorFn(prop)
})`
  ${linkStyle}
`
