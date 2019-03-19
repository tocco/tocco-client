import styled from 'styled-components'
import _get from 'lodash/get'

import {
  declareFont,
  declareNoneWrappingText,
  declareWrappingText,
  shadeColor
} from '../utilStyles'

const StyledLink = styled.a`
  ${props => declareFont(props)}
  ${props => props.breakWords ? declareWrappingText() : declareNoneWrappingText()}

  && {
    color: ${props => props.neutral
    ? _get(props.theme, 'colors.text')
    : _get(props.theme, 'colors.primary')};
    text-decoration: ${props => props.neutral ? 'underline' : 'none'};

    &:hover,
    &:focus {
      color: ${props => props.neutral
    ? shadeColor(_get(props.theme, 'colors.text'), 1)
    : shadeColor(_get(props.theme, 'colors.primary'), 1)};
      text-decoration: ${props => props.neutral ? 'none' : 'underline'};
    }

    &:active {
      color: ${props => props.neutral
    ? shadeColor(_get(props.theme, 'colors.text'), 2)
    : shadeColor(_get(props.theme, 'colors.primary'), 2)};
      text-decoration: ${props => props.neutral ? 'none' : 'underline'};
    }
  }
`

export default StyledLink
