import styled from 'styled-components'
import _get from 'lodash/get'
import {StyledButton} from 'tocco-ui/src/Button'
import {
  declareInteractionColors,
  generateInteractionColors,
  theme,
  scale
} from 'tocco-ui/src/utilStyles'

export default styled(StyledButton)`
  && {
    flex: 1;
    font-size: ${scale.font(1.3)};
    justify-content: center;
    border-radius: ${theme.radii('large')};
    padding: 1.15rem 0;
    border: 0;
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
