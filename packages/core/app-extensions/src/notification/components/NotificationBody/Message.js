import {notificationPropType} from '../../types'
import {StyledMessage} from './StyledComponents'

const Message = ({notification}) => {
  const {message} = notification
  if (!message || message.trim().length === 0) {
    return null
  }
  return <StyledMessage>{message}</StyledMessage>
}

Message.propTypes = {
  notification: notificationPropType.isRequired
}

export default Message
