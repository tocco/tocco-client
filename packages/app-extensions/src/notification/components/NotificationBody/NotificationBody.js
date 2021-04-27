import React from 'react'
import PropTypes from 'prop-types'
import {LoadingSpinner, Icon} from 'tocco-ui'
import styled from 'styled-components'

import {notificationPropType} from '../../types'

const StyledProgressOuter = styled.div`
  background-color: #000;
  width: 150px;
  height: 10px;
`

const StyledProgressInner = styled.div`
  background-color: #131;
  width: ${({percentage}) => percentage}%;
  height: 10px;
`

const Result = ({notification: {result}, navigationStrategy}) => {
  if (result.type === 'OUTPUTJOB') {
    return <>
      {result.file.description}
      <a href={result.file.link} download={result.file.name} title="download"><Icon icon="download" /></a>
      <a href={result.file.link} target="_blank " title="open"><Icon icon="file" /></a>
    </>
  }

  if (result.type === 'ENTITIES') {
    return <>
      {result.content.map(entity => {
        return <navigationStrategy.DetailLink
          key={'entitylink-' + entity.key}
          entityName={entity.model}
          entityKey={entity.key}
        >
          {entity.display}
        </navigationStrategy.DetailLink>
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

const TaskProgress = ({notification: {taskProgress}, navigationStrategy}) => {
  return <>
    <span>{taskProgress.message}</span>
    {taskProgress.isRunning && <LoadingSpinner />}
    {taskProgress.status === 'running_absolute'
      && <>
        <StyledProgressOuter>
          <StyledProgressInner percentage={taskProgress.percentage}>
          </StyledProgressInner>
        </StyledProgressOuter>
        {taskProgress.done} / {taskProgress.total} = {taskProgress.percentage} %
      </>
    }
    <navigationStrategy.DetailLink entityName="Task_execution" entityKey={taskProgress.key}>
      Task öffnen
      </navigationStrategy.DetailLink>
  </>
}

TaskProgress.propTypes = {
  notification: notificationPropType.isRequired,
  navigationStrategy: PropTypes.shape({
    DetailLink: PropTypes.elementType
  })
}

function NotificationBody({notification, navigationStrategy}) {
  const {result, taskProgress} = notification

  if (result) {
    return <Result notification={notification} navigationStrategy={navigationStrategy} />
  }

  if (taskProgress) {
    return <TaskProgress notification={notification} navigationStrategy={navigationStrategy} />
  }

  return null
}

NotificationBody.propTypes = {
  notification: notificationPropType.isRequired,
  navigationStrategy: PropTypes.shape({
    DetailLink: PropTypes.elementType
  })
}

export default NotificationBody
