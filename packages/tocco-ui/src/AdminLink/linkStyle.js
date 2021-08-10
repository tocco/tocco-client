import {css} from 'styled-components'
import _get from 'lodash/get'

import {declareFont, shadeColor, theme} from '../utilStyles'

export const linkStyle = css`
  ${declareFont()}
  color: ${theme.color('text')};

  * {
    color: ${theme.color('text')};
    text-decoration: ${({neutral}) => neutral ? 'none' : 'underline'};
  }

  &:hover,
  &:hover *,
  &:focus,
  &:focus * {
    text-decoration: ${({neutral}) => neutral ? 'none' : 'underline'};
  }

  &:active,
  &:active * {
    color: ${({neutral, theme}) => neutral
              ? shadeColor(_get(theme, 'colors.text'), 2)
              : shadeColor(_get(theme, 'colors.primary'), 2)};
    text-decoration: ${({neutral}) => neutral ? 'none' : 'underline'};
  }
`
