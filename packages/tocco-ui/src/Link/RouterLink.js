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
  color: ${theme.color('primary')};

  * {
    color: ${theme.color('text')};
    text-decoration: none;
  }

  &:hover,
  &:hover *,
  &:focus,
  &:focus * {
    color: ${theme.color('secondaryLight')};
    text-decoration: ${props => props.neutral ? 'none' : 'underline'};
  }

  &:active,
  &:active * {
    color: ${props => props.neutral
  ? shadeColor(_get(props.theme, 'colors.text'), 2)
  : shadeColor(_get(props.theme, 'colors.primary'), 2)};
    text-decoration: ${props => props.neutral ? 'none' : 'underline'};
  }
`
