import React from 'react'

import StyledSignalList from './StyledSignalList'

/**
 * Signalize conditions by icon and color in a list.
 */
const SignalList = props => {
  return (
    <StyledSignalList>
      { // eslint-disable-next-line
        React.Children.map(props.children, child => {
          return React.cloneElement(child)
        })}
    </StyledSignalList>
  )
}

export default SignalList
