import styled from 'styled-components'
import {Link} from 'react-router-dom'
import _get from 'lodash/get'

import {declareFont, shadeColor, theme} from '../utilStyles'

/**
 * A styled version of https://reactrouter.com/web/api/Link
 */
export default styled(Link)`
  ${declareFont()}
  text-decoration: none;
  color: ${theme.color('secondary')};

  * {
    color: ${theme.color('text')};
    text-decoration: none;
  }

  &:hover,
  &:hover *,
  &:focus,
  &:focus * {
    color: ${theme.color('secondaryLight')};
    text-decoration: ${({neutral}) => neutral ? 'none' : 'underline'};
  }

  &:active,
  &:active * {
    color: ${({neutral, theme}) => neutral
  ? shadeColor(_get(theme, 'colors.text'), 2)
  : shadeColor(_get(theme, 'colors.secondary'), 2)};
    text-decoration: ${({neutral}) => neutral ? 'none' : 'underline'};
  }
`
