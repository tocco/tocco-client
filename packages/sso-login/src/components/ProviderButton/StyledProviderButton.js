import _get from 'lodash/get'
import styled from 'styled-components'
import {StyledButton, theme, scale, generateInteractionColors, declareInteractionColors} from 'tocco-ui'

export default styled(StyledButton)`
  && {
    margin-right: 0;
    flex: 1;
    font-size: ${scale.font(1.3)};
    justify-content: center;
    border-radius: ${theme.radii('large')};
    ${props =>
      declareInteractionColors(
        generateInteractionColors(props, {
          bg: props.primaryColor,
          fg: props.secondaryColor || `${_get(props.theme, 'colors.paper')}, ${_get(props.theme, 'colors.text')}`
        })
      )}
    span {
      margin-left: 0.5em;
      padding: 0.9rem 0;
    }
  }
`
