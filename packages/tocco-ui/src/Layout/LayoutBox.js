import PropTypes from 'prop-types'
import React, {memo} from 'react'

import StyledLayoutBox from './StyledLayoutBox'

/**
 * Wrap as many <Layout.Box/> into a <Layout.Container> to layout them.
 */
const LayoutBox = ({children}) => (
  <StyledLayoutBox>
    {children}
  </StyledLayoutBox>
)

LayoutBox.propTypes = {
  children: PropTypes.node
}

export default memo(LayoutBox)
