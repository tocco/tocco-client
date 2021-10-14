import {css} from 'styled-components'
import _get from 'lodash/get'

import {shadeColor} from '../utilStyles'

export const StyledScrollbar = css`
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({theme}) => shadeColor(_get(theme, 'colors.paper'), 4)};

    &:hover {
      background-color: ${({theme}) => shadeColor(_get(theme, 'colors.text'), 5)};
    }
  }
  scrollbar-color: ${({theme}) => shadeColor(_get(theme, 'colors.paper'), 4)} transparent; // Firefox workaround
  scrollbar-width: thin;
`
