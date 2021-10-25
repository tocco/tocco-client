import React from 'react'
import PropTypes from 'prop-types'
import {Icon, LoadingSpinner} from 'tocco-ui'
import {download} from 'tocco-util'
import {FormattedMessage} from 'react-intl'
import _groupBy from 'lodash/groupBy'

import {notificationPropType, TYPES} from '../../types'
import {
  StyledCancelWrapper,
  StyledDetailLinkWrapper,
  StyledFileDescription,
  StyledIconWrapper,
  StyledMessage,
  StyledOutputJobWrapper,
  StyledProgressInner,
  StyledProgressOuter,
  StyledSpinnerWrapper,
  StyledTaskProgressWrapper
} from './StyledComponents'
import {resultTypes} from '../../api'

const Result = ({
  notification: {result},
  navigationStrategy
}) => {
  const {
    type,
    file,
    content
  } = result

  if (type === resultTypes.outputjob) {
    if (file) {
      return (
        <StyledOutputJobWrapper>
          <StyledFileDescription>
            <a href={file.link} target="_blank " title="open">
              {file.description}
            </a>
          </StyledFileDescription>
          <div>
            <a href={file.link} target="_blank " title="open">
              <StyledIconWrapper><Icon icon="external-link"/></StyledIconWrapper>
              <FormattedMessage id="client.common.notification.outputJobFileLink"/>
            </a>
          </div>
          {download.downloadSupportedByBrowser()
          && <a
            href={download.addParameterToURL(file.link, 'download', true)}
            download={file.name}
            title="download">
            <StyledIconWrapper><Icon icon="arrow-to-bottom"/></StyledIconWrapper>
            <FormattedMessage id="client.common.notification.outputJobFileDownload"/>
          </a>
          }
          <StyledDetailLinkWrapper>
            {navigationStrategy && navigationStrategy.DetailLink && <navigationStrategy.DetailLink
              entityName={content[0].model}
              entityKey={content[0].key}
            >
              <Icon icon="arrow-right"/> <FormattedMessage id="client.common.notification.outputJobOpen"/>
            </navigationStrategy.DetailLink>}
          </StyledDetailLinkWrapper>
        </StyledOutputJobWrapper>)
    } else {
      return null
    }
  }

  if (type === resultTypes.entities) {
    return <>
      {Object.entries(_groupBy(content, e => e.model))
        .map(([model, entities]) => (
          <StyledDetailLinkWrapper key={'entitylink-' + model}>
            {navigationStrategy && navigationStrategy.ListOrDetailLink && <navigationStrategy.ListOrDetailLink
              entityName={model}
              entityKeys={entities.map(e => e.key)}
            >
              <Icon icon="external-link"/> <FormattedMessage id="client.common.notification.entitiesOpen"/>
            </navigationStrategy.ListOrDetailLink>}
          </StyledDetailLinkWrapper>
        ))
      }
    </>
  }

  return null
}

Result.propTypes = {
  notification: notificationPropType.isRequired,
  navigationStrategy: PropTypes.shape({
    DetailLink: PropTypes.elementType,
    ListOrDetailLink: PropTypes.elementType
  })
}

const TaskProgress = ({
  notification,
  cancelTask,
  navigationStrategy
}) => {
  const {taskProgress} = notification
  return (
    <>
      <StyledTaskProgressWrapper>
        <StyledSpinnerWrapper>{taskProgress.isRunning && <LoadingSpinner/>}</StyledSpinnerWrapper>
        <Message notification={notification}/>
      </StyledTaskProgressWrapper>
      {taskProgress.status === 'running_absolute'
      && <>
        <StyledProgressOuter>
          <StyledProgressInner percentage={taskProgress.percentage}/>
        </StyledProgressOuter>
      </>
      }
      <StyledDetailLinkWrapper>
        {navigationStrategy && navigationStrategy.DetailLink && taskProgress.status !== 'completed'
        && <navigationStrategy.DetailLink entityName="Task_execution" entityKey={taskProgress.taskExecutionKey}>
          <StyledIconWrapper><Icon icon="arrow-right"/></StyledIconWrapper>
          <FormattedMessage id="client.common.notification.outputJobShowTask"/>
        </navigationStrategy.DetailLink>}
      </StyledDetailLinkWrapper>
      {notification.type === TYPES.info && taskProgress.isRunning && taskProgress.supportsCancellation
      && <StyledCancelWrapper onClick={() => cancelTask(taskProgress.taskExecutionKey)}>
        <StyledIconWrapper><Icon icon="times"/></StyledIconWrapper>
        <FormattedMessage id="client.common.notification.cancelTask"/>
      </StyledCancelWrapper>}
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

const NotificationBody = ({
  notification,
  cancelTask,
  navigationStrategy
}) => {
  const {
    result,
    taskProgress
  } = notification

  if (result) {
    return (
      <>
        <Message notification={notification}/>
        <Result notification={notification} navigationStrategy={navigationStrategy}/>
      </>
    )
  }

  if (taskProgress) {
    return <TaskProgress notification={notification} navigationStrategy={navigationStrategy} cancelTask={cancelTask}/>
  }

  return <Message notification={notification}/>
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
