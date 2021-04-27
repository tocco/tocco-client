import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const RedDotStyled = styled.span`
  width: 10px;
  height: 10px;
  position: relative;
  top: -7px;
  left: -10px;
  background-color: #f00;
  border-radius: 50%;
  display: inline-block;
`

const NotificationCenterRedDot = ({unreadNotificationKeys, onClick, innerRef}) => {
  if (unreadNotificationKeys.length > 0) {
    return <RedDotStyled onClick={onClick} ref={innerRef}/>
  }
  return null
}

NotificationCenterRedDot.propTypes = {
  unreadNotificationKeys: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func.isRequired,
  innerRef: PropTypes.shape({current: PropTypes.any})
}

export default NotificationCenterRedDot
