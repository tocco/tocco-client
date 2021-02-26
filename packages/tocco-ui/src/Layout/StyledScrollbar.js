import {css} from 'styled-components'
import _get from 'lodash/get'

import {shadeColor, theme} from '../utilStyles'

export const StyledScrollbar = css`
  ::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({theme}) => shadeColor(_get(theme, 'colors.text'), 2)};

    &:hover {
      background-color: ${theme.color('secondary')};
    }
  }
  scrollbar-color: ${theme.color('text')} transparent; // Firefox workaround
  scrollbar-width: thin;
`
