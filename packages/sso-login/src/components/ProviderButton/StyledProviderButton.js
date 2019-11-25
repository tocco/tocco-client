import styled from 'styled-components'
import _get from 'lodash/get'
import {StyledButton} from 'tocco-ui/src/Button'
import {
  declareInteractionColors,
  generateInteractionColors,
  theme
} from 'tocco-ui/src/utilStyles'

export default styled(StyledButton)`
  && {
    flex: 1;
    justify-content: center;
    border-radius: ${theme.radii('large')};
    ${props => declareInteractionColors(
    generateInteractionColors(props, {
      bg: props.primaryColor,
      fg: props.secondaryColor || `${_get(props.theme, 'colors.paper')}, ${_get(props.theme, 'colors.text')}`
    }))}
    
    &:not(:first-child) {
      margin-left: 1rem;
    }
    
    span {
      margin-left: .5em;
      padding: 1rem 0;
    }
  }
`
