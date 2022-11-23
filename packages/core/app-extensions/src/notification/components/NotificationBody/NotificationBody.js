import PropTypes from 'prop-types'

import {notificationPropType} from '../../types'
import Message from './Message'
import Result from './Result'
import TaskProgress from './TaskProgress'

const NotificationBody = ({notification, cancelTask, navigationStrategy}) => {
  const {result, taskProgress} = notification

  if (result) {
    return (
      <>
        <Message notification={notification} />
        <Result notification={notification} navigationStrategy={navigationStrategy} />
      </>
    )
  }

  if (taskProgress) {
    return <TaskProgress notification={notification} navigationStrategy={navigationStrategy} cancelTask={cancelTask} />
  }

  return <Message notification={notification} />
}

NotificationBody.propTypes = {
  notification: notificationPropType.isRequired,
  cancelTask: PropTypes.func.isRequired,
  navigationStrategy: PropTypes.shape({
    DetailLink: PropTypes.elementType,
    ListOrDetailLink: PropTypes.elementType
  })
}

export default NotificationBody
