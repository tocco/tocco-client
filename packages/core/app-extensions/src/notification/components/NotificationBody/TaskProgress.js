import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {Icon, LoadingSpinner} from 'tocco-ui'

import {notificationPropType, TYPES} from '../../types'
import Message from './Message'
import {
  StyledCancelWrapper,
  StyledDetailLinkWrapper,
  StyledIconWrapper,
  StyledProgressInner,
  StyledProgressOuter,
  StyledSpinnerWrapper,
  StyledTaskProgressWrapper
} from './StyledComponents'

const TaskProgress = ({notification, cancelTask, navigationStrategy}) => {
  const {taskProgress} = notification
  return (
    <>
      <StyledTaskProgressWrapper>
        <StyledSpinnerWrapper>{taskProgress.isRunning && <LoadingSpinner />}</StyledSpinnerWrapper>
        <Message notification={notification} />
      </StyledTaskProgressWrapper>
      {taskProgress.status === 'running_absolute' && (
        <>
          <StyledProgressOuter>
            <StyledProgressInner percentage={taskProgress.percentage} />
          </StyledProgressOuter>
        </>
      )}
      <StyledDetailLinkWrapper>
        {navigationStrategy && navigationStrategy.DetailLink && taskProgress.status !== 'completed' && (
          <navigationStrategy.DetailLink entityName="Task_execution" entityKey={taskProgress.taskExecutionKey}>
            <StyledIconWrapper>
              <Icon icon="arrow-right" />
            </StyledIconWrapper>
            <FormattedMessage id="client.common.notification.outputJobShowTask" />
          </navigationStrategy.DetailLink>
        )}
      </StyledDetailLinkWrapper>
      {notification.type === TYPES.info && taskProgress.isRunning && taskProgress.supportsCancellation && (
        <StyledCancelWrapper onClick={() => cancelTask(taskProgress.taskExecutionKey)}>
          <StyledIconWrapper>
            <Icon icon="times" />
          </StyledIconWrapper>
          <FormattedMessage id="client.common.notification.cancelTask" />
        </StyledCancelWrapper>
      )}
    </>
  )
}

TaskProgress.propTypes = {
  notification: notificationPropType.isRequired,
  cancelTask: PropTypes.func.isRequired,
  navigationStrategy: PropTypes.shape({
    DetailLink: PropTypes.elementType
  })
}

export default TaskProgress
