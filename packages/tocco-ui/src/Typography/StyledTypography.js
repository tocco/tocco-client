import styled from 'styled-components'

import {declareFont} from '../utilStyles'

const StyledSpan = styled.span`
  && {
    ${props => declareFont(props)}
  }
`

export {StyledSpan}
