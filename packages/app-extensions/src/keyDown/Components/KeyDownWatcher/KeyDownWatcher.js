import React, {useEffect} from 'react'
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

  const onDocumentKeyDown = event => {
    keyDownHandler({..._pick(event, ['metaKey', 'ctrlKey', 'key']), global: true})
  }

  useEffect(() => {
    document.addEventListener('keydown', onDocumentKeyDown)

    return () => {
      document.removeEventListener('keydown', onDocumentKeyDown)
    }
  }, [])

  return <StyledDiv tabIndex="0" onKeyDown={onKeyDown}>{children}</StyledDiv>
}

KeyDownWatcher.propTypes = {
  children: PropTypes.node,
  keyDownHandler: PropTypes.func.isRequired
}

export default KeyDownWatcher
