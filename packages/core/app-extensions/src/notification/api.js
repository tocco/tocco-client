import {call} from 'redux-saga/effects'

import rest from '../rest'
import {resultTypes} from './types'

const typeMapper = {
  failed: 'error',
  info: 'info',
  warning: 'warning',
  success: 'success'
}

const taskProgressStatus = {
  running_infinite: 'running_infinite',
  running_absolute: 'running_absolute',
  pending: 'pending',
  failed: 'failed',
  completed: 'completed',
  cancelled: 'cancelled'
}

const isTaskRunning = taskProgress =>
  taskProgress.status &&
  (taskProgress.status === taskProgressStatus.pending ||
    taskProgress.status === taskProgressStatus.running_absolute ||
    taskProgress.status === taskProgressStatus.running_infinite)

export function* notificationTransform(notification) {
  const transformed = {
    ...notification,
    type: typeMapper[notification.type] || 'info',
    result: notification.result ? JSON.parse(notification.result) : null,
    taskProgress: notification.taskProgress
      ? {
          ...notification.taskProgress,
          isRunning: isTaskRunning(notification.taskProgress),
          percentage: Math.round((100 / notification.taskProgress.total) * notification.taskProgress.done)
        }
      : null
  }

  if (transformed.result && transformed.result.type === resultTypes.outputjob) {
    let file = null
    try {
      const outputJobKey = transformed.result.content[0].key
      const outputJob = yield call(rest.fetchEntity, 'Output_job', outputJobKey, {paths: ['document']})
      const {fileName, binaryLink} = outputJob.paths.document.value

      file = {
        name: fileName,
        link: binaryLink,
        description: transformed.result.content[0].display
      }
    } catch (e) {
      // Unable to fetch output job. This usually means it is already deleted. No actions required.
    }

    transformed.result = {
      ...transformed.result,
      file
    }
  }

  return transformed
}
