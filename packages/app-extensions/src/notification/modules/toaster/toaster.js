import PropTypes from 'prop-types'
import {v4 as uuid} from 'uuid'

import {iconMap, isWarningOrError, TYPES} from '../../types'

const DEFAULT_DURATION = 5000

export const enhanceToaster = toaster => {
  if (!toaster.title && !toaster.body) {
    return null
  }

  const type = toaster.type && Object.keys(TYPES).includes(toaster.type) ? toaster.type : TYPES.neutral

  return {
    type,
    key: toaster.key || uuid(),
    ...(toaster.title && {title: toaster.title}),
    ...(toaster.body && {body: toaster.body}),
    icon: toaster.icon || iconMap[type],
    ...(toaster.onClose && typeof toaster.onClose === 'function' && {onClose: toaster.onClose}),
    duration: Number.isInteger(toaster.duration) ? toaster.duration : isWarningOrError(type) ? -1 : DEFAULT_DURATION,
    time: toaster.time instanceof Date ? toaster.time : Date.now()
  }
}

export const ToasterPropType = PropTypes.shape({
  type: PropTypes.oneOf(Object.values(TYPES)).isRequired,
  title: PropTypes.string,
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  onClose: PropTypes.func,
  icons: PropTypes.string,
  duration: PropTypes.number,
  time: PropTypes.instanceOf(Date)
})
