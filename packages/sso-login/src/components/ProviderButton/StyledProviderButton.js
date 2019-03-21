import styled from 'styled-components'
import _get from 'lodash/get'
import {StyledButton} from 'tocco-ui/src/Button'
import {
  declareInteractionColors,
  generateInteractionColors
} from 'tocco-ui/src/utilStyles'

export default styled(StyledButton)`
  && {
    display: inline-block;
    width: 100%;
    ${props => declareInteractionColors(
    generateInteractionColors(props, {
      bg: props.primaryColor,
      fg: props.secondaryColor || `${_get(props.theme, 'colors.paper')}, ${_get(props.theme, 'colors.text')}`
    }))}

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`
