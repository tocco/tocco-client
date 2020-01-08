import {declareFont, shadeColor, theme} from 'tocco-ui'
import {css} from 'styled-components'
import _get from 'lodash/get'

export const linkStyle = css`
  ${declareFont()}

  text-decoration: none;
  color: ${theme.color('text')}
   
  & * {
    color: ${theme.color('text')}
    text-decoration: none;
  }
  
  &:hover, &:hover *,
  &:focus, &:focus * {
    color: ${theme.color('secondaryLight')};
    text-decoration: ${props => props.neutral ? 'none' : 'underline'};
  }

  &:active, &:active * {
    color: ${props => props.neutral
    ? shadeColor(_get(props.theme, 'colors.text'), 2)
    : shadeColor(_get(props.theme, 'colors.primary'), 2)};
    text-decoration: ${props => props.neutral ? 'none' : 'underline'};
  }
`
