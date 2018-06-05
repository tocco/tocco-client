import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import {declareFont} from '../utilStyles'

const StyledSpan = styled.span`
  && {
    ${props => declareFont(props)}
  }
`

/**
 * Utilize only React components (e.g. <Span>) instead of pure html tags (e.g. <span>)
 * ensure coherent typography and prevent css leaking. Default Fonts are loaded
 * automatically. When other fonts are defined it is required to load font files
 * manually and to define corresponding @font-face.
 */
const Span = props => {
  return (
    <StyledSpan>{props.children}</StyledSpan>
  )
}

Span.propTypes = {
  children: PropTypes.node.isRequired
}

export {
  Span as default,
  StyledSpan,
  declareFont
}
