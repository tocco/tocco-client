import styled from 'styled-components'
import _get from 'lodash/get'
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
      props.secondaryColor || _get(props.theme, 'colors.paper'),
      props.secondaryColor || _get(props.theme, 'colors.text')))}

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`
