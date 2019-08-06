import styled from 'styled-components'

import {StyledButton} from '../Button'

const StyledButtonLink = styled(StyledButton)`
  && {
    box-sizing: border-box;

    &,
    :hover,
    :focus {
      text-decoration: none;
    }
  }
`

export default StyledButtonLink
