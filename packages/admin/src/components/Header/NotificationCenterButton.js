import React, {useState, useEffect, useRef} from 'react'
import ReactDOM from 'react-dom'
import {usePopper} from 'react-popper'
import {notification} from 'tocco-app-extensions'

import navigationStrategy from './../../routes/entities/utils/navigationStrategy'
import NotificationCenterRedDotContainer from './NotificationCenterRedDotContainer'
import {StyledNotificationBellWrapper, StyledBall, StyledPopper} from './StyledComponents'

const popperModifiers = [
  {
    name: 'offset',
    options: {
      offset: [0, 3]
    }
  },
  {
    name: 'preventOverflow',
    options: {
      padding: 35
    }
  }
]

const NotificationCenterButton = () => {
  const [visible, setVisibility] = useState(false)

  const referenceElement = useRef(null)
  const popperElement = useRef(null)
  const redDotElement = useRef(null)

  const handleMouseDown = e => {
    if (popperElement.current && !popperElement.current.contains(e.target)
      && referenceElement.current && !referenceElement.current.contains(e.target)
      && redDotElement.current && !redDotElement.current.contains(e.target)) {
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
    <StyledNotificationBellWrapper>
      <StyledBall onClick={() => setVisibility(!visible)} icon="bell" ref={referenceElement}/>
      <span ref={redDotElement}><NotificationCenterRedDotContainer onClick={() => setVisibility(!visible)}/></span>
    </StyledNotificationBellWrapper>
    {ReactDOM.createPortal(
      <StyledPopper
        ref={popperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        {visible && <notification.NotificationCenter navigationStrategy={navigationStrategy()}/>}
      </StyledPopper>,
      document.body
    )}
  </>
}

export default NotificationCenterButton
