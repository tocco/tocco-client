import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import _pick from 'lodash/pick'
const StyledDiv = styled.div`
  :focus {
      outline: none;
  }
`

const KeyDownWatcher = ({children, keyDownHandler}) => {
  const onKeyDown = event => {
    keyDownHandler({..._pick(event, ['metaKey', 'ctrlKey', 'key'])})
  }

  return <StyledDiv tabIndex="0" onKeyDown={onKeyDown}>{children}</StyledDiv>
}

KeyDownWatcher.propTypes = {
  children: PropTypes.node,
  keyDownHandler: PropTypes.func.isRequired
}

export default KeyDownWatcher
