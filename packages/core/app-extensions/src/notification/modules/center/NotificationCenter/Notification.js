import {selectUnit} from '@formatjs/intl-utils'
import PropTypes from 'prop-types'
import React, {useRef, useState} from 'react'
import {FormattedRelativeTime} from 'react-intl'
import {Typography, Icon} from 'tocco-ui'

import NotificationBody from '../../../components/NotificationBody'
import {notificationPropType} from '../../../types'
import {
  StyledNotification,
  StyledNotificationHeader,
  StyledIconWrapper,
  StyledTitleWrapper,
  StyledTimeStamp
} from './StyledComponents'
import useInViewport from './useInViewport'

const typeIconMap = {
  warning: 'exclamation-circle',
  error: 'times-circle',
  success: 'check-circle',
  info: 'info-circle'
}

const Notification = ({notification, markAsRead, cancelTask, navigationStrategy}) => {
  const notificationElement = useRef(null)

  const {value: timeStampValue, unit} = selectUnit(new Date(notification.timestamp))

  const notificationInViewport = () => {
    if (!notification.read) {
      markAsRead(notification.key)
    }
  }
  const [initialRead] = useState(() => notification.read)
  useInViewport(notificationElement, notificationInViewport)

  return (
    <StyledNotification ref={notificationElement} read={initialRead}>
      <StyledNotificationHeader notificationType={notification.type}>
        <StyledIconWrapper>
          <Icon icon={typeIconMap[notification.type]} />
        </StyledIconWrapper>
        <StyledTitleWrapper>
          <Typography.H5>{notification.title}</Typography.H5>
        </StyledTitleWrapper>
      </StyledNotificationHeader>
      <NotificationBody notification={notification} navigationStrategy={navigationStrategy} cancelTask={cancelTask} />
      <StyledTimeStamp>
        <FormattedRelativeTime value={timeStampValue} unit={unit} />
      </StyledTimeStamp>
    </StyledNotification>
  )
}

Notification.propTypes = {
  notification: notificationPropType.isRequired,
  markAsRead: PropTypes.func.isRequired,
  cancelTask: PropTypes.func.isRequired,
  navigationStrategy: PropTypes.object
}

export default Notification
