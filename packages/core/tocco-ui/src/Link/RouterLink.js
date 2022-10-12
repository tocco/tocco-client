import _get from 'lodash/get'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

import {declareFont, shadeColor, themeSelector} from '../utilStyles'

/**
 * A styled version of https://reactrouter.com/web/api/Link
 */
export default styled(Link)`
  ${declareFont()}
  text-decoration: none;
  color: ${themeSelector.color('secondary')};

  * {
    color: ${themeSelector.color('text')};
    text-decoration: none;
  }

  &:hover,
  &:hover *,
  &:focus,
  &:focus * {
    color: ${themeSelector.color('secondaryLight')};
    text-decoration: ${({neutral}) => (neutral ? 'none' : 'underline')};
  }

  &:active,
  &:active * {
    color: ${({neutral, theme}) =>
      neutral ? shadeColor(_get(theme, 'colors.text'), 2) : shadeColor(_get(theme, 'colors.secondary'), 2)};
    text-decoration: ${({neutral}) => (neutral ? 'none' : 'underline')};
  }
`
