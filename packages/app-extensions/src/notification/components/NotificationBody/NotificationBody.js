import React from 'react'
import PropTypes from 'prop-types'
import {LoadingSpinner, Icon} from 'tocco-ui'
import {download} from 'tocco-util'
import {FormattedMessage} from 'react-intl'

import {notificationPropType, TYPES} from '../../types'
import {
  StyledOutputJobWrapper,
  StyledDetailLinkWrapper,
  StyledTaskProgressWrapper,
  StyledSpinnerWrapper,
  StyledProgressMessage,
  StyledProgressOuter,
  StyledProgressInner,
  StyledFileDescription,
  StyledIconWrapper,
  StyledCancelWrapper
} from './StyledComponents'
import {resultTypes} from '../../api'

const Result = ({notification: {result}, navigationStrategy}) => {
  if (result.type === resultTypes.outputjob) {
    if (result.file) {
      return (
        <StyledOutputJobWrapper>
          <StyledFileDescription>
            <a href={result.file.link} target="_blank " title="open">
              {result.file.description}
            </a>
          </StyledFileDescription>
          <div>
            <a href={result.file.link} target="_blank " title="open">
              <StyledIconWrapper><Icon icon="external-link"/></StyledIconWrapper>
              <FormattedMessage id="client.common.notification.outputJobFileLink"/>
            </a>
          </div>
          {download.downloadSupportedByBrowser()
          && <a
            href={download.addParameterToURL(result.file.link, 'download', true)}
            download={result.file.name}
            title="download">
            <StyledIconWrapper><Icon icon="arrow-to-bottom"/></StyledIconWrapper>
            <FormattedMessage id="client.common.notification.outputJobFileDownload"/>
          </a>
          }
          <StyledDetailLinkWrapper>
            {navigationStrategy && navigationStrategy.DetailLink && <navigationStrategy.DetailLink
              entityName={result.content[0].model}
              entityKey={result.content[0].key}
            >
              <Icon icon="arrow-right"/> <FormattedMessage id="client.common.notification.outputJobOpen"/>
            </navigationStrategy.DetailLink>}
          </StyledDetailLinkWrapper>
        </StyledOutputJobWrapper>)
    } else {
      return null
    }
  }

  if (result.type === resultTypes.entities) {
    return <>
      {result.content.map(entity => {
        return (
          <StyledDetailLinkWrapper key={'entitylink-' + entity.key}>
            {navigationStrategy && navigationStrategy.DetailLink && <navigationStrategy.DetailLink
              entityName={entity.model}
              entityKey={entity.key}
            >
              <Icon icon="external-link"/> {entity.display}
            </navigationStrategy.DetailLink>}
          </StyledDetailLinkWrapper>
        )
      })
      }
    </>
  }

  return null
}

Result.propTypes = {
  notification: notificationPropType.isRequired,
  navigationStrategy: PropTypes.shape({
    DetailLink: PropTypes.elementType
  })
}

const TaskProgress = ({notification, cancelTask, navigationStrategy}) => {
  const {taskProgress} = notification
  return <>
    <StyledTaskProgressWrapper>
      <StyledSpinnerWrapper>{taskProgress.isRunning && <LoadingSpinner/>}</StyledSpinnerWrapper>
      <StyledProgressMessage>{taskProgress.status !== 'cancelled' ? taskProgress.message : ''}</StyledProgressMessage>
    </StyledTaskProgressWrapper>
    {taskProgress.status === 'running_absolute'
    && <>
      <StyledProgressOuter>
        <StyledProgressInner percentage={taskProgress.percentage}/>
      </StyledProgressOuter>
      {taskProgress.done} / {taskProgress.total} = {taskProgress.percentage} %
    </>
    }
    <StyledDetailLinkWrapper>
      {navigationStrategy && navigationStrategy.DetailLink
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
}

TaskProgress.propTypes = {
  notification: notificationPropType.isRequired,
  cancelTask: PropTypes.func.isRequired,
  navigationStrategy: PropTypes.shape({
    DetailLink: PropTypes.elementType
  })
}

const NotificationBody = ({notification, cancelTask, navigationStrategy}) => {
  const {result, taskProgress} = notification

  if (result) {
    return <Result notification={notification} navigationStrategy={navigationStrategy}/>
  }

  if (taskProgress) {
    return <TaskProgress notification={notification} navigationStrategy={navigationStrategy} cancelTask={cancelTask}/>
  }

  return null
}

NotificationBody.propTypes = {
  notification: notificationPropType.isRequired,
  cancelTask: PropTypes.func.isRequired,
  navigationStrategy: PropTypes.shape({
    DetailLink: PropTypes.elementType
  })
}

export default NotificationBody
