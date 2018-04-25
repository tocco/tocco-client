import React from 'react'
import styled from 'styled-components'
import {theme} from 'styled-system'

const StyledSignalList = styled.ul`
  display: block;
  list-style-type: none;
  margin: 0;
  padding: 0;

  > li > ul {
    margin-left: ${theme('space.5')};
  }
`

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

export {
  SignalList as default,
  StyledSignalList
}
