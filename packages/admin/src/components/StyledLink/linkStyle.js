import {declareFont, shadeColor, theme} from 'tocco-ui'
import {css} from 'styled-components'
import _get from 'lodash/get'

export const linkStyle = css`
  ${declareFont()}

  color: ${props => props.neutral
    ? theme.color('text')
    : theme.color('primary')};
  text-decoration: ${props => props.neutral ? 'underline' : 'none'};

  &:hover,
  &:focus {
    color: ${props => props.neutral
    ? shadeColor(_get(props.theme, 'colors.text'), 1)
    : shadeColor(_get(props.theme, 'colors.primary'), 1)};
    text-decoration: ${props => props.neutral ? 'none' : 'underline'};
  }

  &:active {
   text-decoration: ;
    color: ${props => props.neutral
    ? shadeColor(_get(props.theme, 'colors.text'), 2)
    : shadeColor(_get(props.theme, 'colors.primary'), 2)};
    text-decoration: ${props => props.neutral ? 'none' : 'underline'};
  }
  
   &.active {
   text-decoration: ;
    color: ${props => props.neutral
    ? shadeColor(_get(props.theme, 'colors.text'), 2)
    : shadeColor(_get(props.theme, 'colors.primary'), 2)};
    text-decoration: ${props => props.neutral ? 'none' : 'underline'};
  }
`
