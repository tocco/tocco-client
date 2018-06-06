import PropTypes from 'prop-types'
import React from 'react'

import {StyledSpan} from './StyledTypography'
import {getTextOfChildren} from '../utilStyles'

/**
 * Utilize only React components (e.g. <Span>) instead of pure html tags (e.g. <span>)
 * ensure coherent typography and prevent css leaking. Default Fonts are loaded
 * automatically. When other fonts are defined it is required to load font files
 * manually and to define corresponding @font-face.
 */
const Span = props => {
  return (
    <StyledSpan
      breakWords={props.breakWords}
      title={props.breakWords ? 'false' : getTextOfChildren(props.children)}
    >{props.children}</StyledSpan>
  )
}

Span.defaultProps = {
  breakWords: true
}

Span.propTypes = {
  /**
   * If true words break with hyphens. If false text is forced into a single truncated line.
   */
  breakWords: PropTypes.bool,
  children: PropTypes.node.isRequired
}

export {
  Span as default
}
