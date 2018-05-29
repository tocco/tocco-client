import styled from 'styled-components'
import {theme} from 'styled-system'

const StyledLink = styled.a`
  && {
    color: ${theme('colors.primary.line.0')}
    text-decoration: none;

    &:hover,
    &:focus {
      color: ${theme('colors.primary.line.1')}
    }

    &:active {
      color: ${theme('colors.primary.line.2')}
    }
  }
`

export default StyledLink
