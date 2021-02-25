import {css} from 'styled-components'
import {lighten} from 'polished'

import {theme} from '../utilStyles'

export const StyledScrollbar = css`
  ::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({theme}) => lighten(0.3, theme.colors.text)};

    &:hover {
      background-color: ${theme.color('secondary')};
    }
  }
  scrollbar-color: ${theme.color('text')} transparent; // Firefox workaround
  scrollbar-width: thin;
`
