import styled from 'styled-components'
import {theme} from 'styled-system'
import {StyledButton} from 'tocco-ui/src/Button'
import {
  declareInteractionColors,
  generateCustomColors
} from 'tocco-ui/src/utilStyles'

export default styled(StyledButton)`
  && {
    display: inline-block;
    width: 100%;
    ${props => declareInteractionColors(
    generateCustomColors(
      props.primaryColor,
      props.secondaryColor || theme('colors.paper')(props),
      props.secondaryColor || theme('colors.text')(props)))}

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`
