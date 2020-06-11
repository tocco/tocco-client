import {css} from 'styled-components'

import {theme} from '../utilStyles'

export const StyledScrollbar = css`
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${theme.color('text')};

    &:hover {
      background-color: ${theme.color('secondary')};
    }
  }
  scrollbar-color: ${theme.color('text')} transparent; // Firefox workaround
  scrollbar-width: thin;
`
