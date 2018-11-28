import styled from 'styled-components'

import {StyledButton} from '../Button'

const StyledButtonLink = styled(StyledButton)`
  && {
    :hover,
    :focus {
      text-decoration: none;
    }
  }
`

export default StyledButtonLink
