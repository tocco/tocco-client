import PropTypes from 'prop-types'

export const TYPES = {
  neutral: 'neutral',
  info: 'info',
  warning: 'warning',
  error: 'error',
  success: 'success'
}

export const resultTypes = {
  outputjob: 'OUTPUTJOB',
  entities: 'ENTITIES'
}

export const isWarningOrError = type => type === TYPES.error || type === TYPES.warning

export const iconMap = {
  [TYPES.neutral]: null,
  [TYPES.error]: 'times-circle',
  [TYPES.warning]: 'exclamation-circle',
  [TYPES.success]: 'check-circle',
  [TYPES.info]: 'info-circle'
}

export const notificationPropType = PropTypes.shape({
  key: PropTypes.string.isRequired,
  message: PropTypes.string,
  read: PropTypes.bool,
  timestamp: PropTypes.date,
  originId: PropTypes.string,
  type: PropTypes.string,
  taskProgress: PropTypes.shape({
    taskExecutionKey: PropTypes.string.isRequired,
    status: PropTypes.string,
    message: PropTypes.string,
    percentage: PropTypes.number,
    done: PropTypes.number,
    total: PropTypes.number,
    supportsCancellation: PropTypes.bool,
    isRunning: PropTypes.bool
  })
})
