import React, {useState, useEffect, useRef} from 'react'
import ReactDOM from 'react-dom'
import {usePopper} from 'react-popper'
import styled from 'styled-components'
import {Ball} from 'tocco-ui'
import {notification} from 'tocco-app-extensions'

const StyledPopper = styled.div`
  width: 300px;
`

const popperModifiers = [
  {
    name: 'offset',
    options: {
      offset: [0, 15]
    }
  },
  {
    name: 'preventOverflow',
    options: {
      padding: 10
    }
  }
]

const NotificationCenterButton = () => {
  const [visible, setVisibility] = useState(false)

  const referenceElement = useRef(null)
  const popperElement = useRef(null)

  const handleMouseDown = e => {
    if (popperElement.current && !popperElement.current.contains(e.target)
      && referenceElement.current && !referenceElement.current.contains(e.target)) {
      setVisibility(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown)
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [referenceElement, popperElement])

  const {styles, attributes} = usePopper(referenceElement.current, popperElement.current, {modifiers: popperModifiers})

  return <>
      <Ball onClick={() => setVisibility(!visible)} icon="bell" ref={referenceElement}/>
      {ReactDOM.createPortal(
        <StyledPopper
          ref={popperElement}
          style={styles.popper}
          {...attributes.popper}
        >
         {visible && <notification.NotificationCenter />}
          </StyledPopper>,
        document.body
      )}
    </>
}

export default NotificationCenterButton
