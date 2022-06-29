import PropTypes from 'prop-types'
import {v4 as uuid} from 'uuid'

import {iconMap, isWarningOrError, TYPES} from '../../types'

export const DEFAULT_DURATION = 5000

const getDuration = (duration, type) => {
  if (Number.isInteger(duration)) {
    return duration
  }

  return isWarningOrError(type) ? -1 : DEFAULT_DURATION
}

export const enhanceToaster = toaster => {
  if (!toaster.title && !toaster.body) {
    return null
  }

  const type = toaster.type && Object.keys(TYPES).includes(toaster.type) ? toaster.type : TYPES.neutral

  return {
    type,
    key: toaster.key || uuid(),
    ...(toaster.title && {title: toaster.title}),
    ...(toaster.message && {message: toaster.message}),
    ...(toaster.body && {body: toaster.body}),
    icon: toaster.icon || iconMap[type],
    ...(toaster.onClose && typeof toaster.onClose === 'function' && {onClose: toaster.onClose}),
    duration: getDuration(toaster.duration, type),
    time: toaster.time instanceof Date ? toaster.time : new Date()
  }
}

export const ToasterPropType = PropTypes.shape({
  type: PropTypes.oneOf(Object.values(TYPES)).isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  onClose: PropTypes.func,
  icons: PropTypes.string,
  duration: PropTypes.number,
  time: PropTypes.instanceOf(Date)
})
