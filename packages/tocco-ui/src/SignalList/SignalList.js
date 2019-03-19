import PropTypes from 'prop-types'
import React from 'react'

import StyledSignalList from './StyledSignalList'

/**
 * Signalize conditions by icon and color in a list.
 */
export const SignalList = props =>
  <StyledSignalList as="ul">
    {React.Children.map(props.children, child => React.cloneElement(child))}
  </StyledSignalList>

SignalList.propTypes = {
  children: PropTypes.node
}

export default SignalList
