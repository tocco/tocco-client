import React from 'react'
import PropTypes from 'prop-types'

import {StyledRedDot} from './StyledComponents'

const NotificationCenterRedDot = ({
  unreadNotificationKeys,
  onClick,
  innerRef
}) => unreadNotificationKeys.length > 0
  && <StyledRedDot onClick={onClick} ref={innerRef}/>

NotificationCenterRedDot.propTypes = {
  unreadNotificationKeys: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func.isRequired,
  innerRef: PropTypes.shape({current: PropTypes.any})
}

export default NotificationCenterRedDot
