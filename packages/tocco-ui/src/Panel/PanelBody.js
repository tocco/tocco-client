import PropTypes from 'prop-types'
import React from 'react'
import {LazyMotion} from 'framer-motion'

import StyledPanelBody from './StyledPanelBody'

/**
 * Only <Panel.Body/> is affected by the visibility state.
 */

const PanelBody = ({children, isFramed, isOpen}) => {
  const currentVariant = isOpen ? 'open' : 'closed'

  const loadFeatures = () =>
    import('./framerMotionFeatures.js').then(res => res.default)

  return (
    <LazyMotion features={loadFeatures}>
    <StyledPanelBody
      initial={currentVariant}
      animate={currentVariant}
      variants={{
        closed: {height: 0},
        open: {height: 'auto'}
      }}
      transition={{ease: 'easeInOut', duration: 0.3}}
      isFramed={isFramed}
      isOpen={isOpen}
    >
      <div>
        {children}
      </div>
    </StyledPanelBody>
    </LazyMotion>
  )
}

PanelBody.propTypes = {
  children: PropTypes.node,
  /**
   * Boolean to control if <Panel.Header/>, <Panel.Body/> and <Panel.Footer/> is initially opened.
   * Value is always overridden by parent element.
   */
  isFramed: PropTypes.bool,
  /**
   * Boolean to control if <Panel.Body/> is initially opened. Value is always overridden by parent element.
   */
  isOpen: PropTypes.bool
}

export default PanelBody
