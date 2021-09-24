import {css} from 'styled-components'

import {declareFont, theme} from '../utilStyles'

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
    text-decoration: ${({neutral}) => neutral ? 'none' : 'underline'};
  }
`
