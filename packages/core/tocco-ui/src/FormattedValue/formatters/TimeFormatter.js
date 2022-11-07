import {format} from 'date-fns'
import PropTypes from 'prop-types'
import {injectIntl} from 'react-intl'

import Typography from '../../Typography'

export const getTimePartOrZero = (value, part) => parseInt(value.split(':')[part]) || 0

const TimeFormatter = ({value, intl}) => {
  const hours = getTimePartOrZero(value, 0)
  const minutes = getTimePartOrZero(value, 1)
  const seconds = getTimePartOrZero(value, 2)
  const milliSeconds = getTimePartOrZero(value, 3)

  const date = new Date(2000, 1, 1, hours, minutes, seconds, milliSeconds)
  const timeIso = format(date, 'HH:mm:ss.SSS')

  // show alwas 24h format
  const formattedTime = format(date, 'HH:mm')

  return (
    <Typography.Time dateTime={timeIso} title={formattedTime}>
      {formattedTime}
    </Typography.Time>
  )
}

TimeFormatter.propTypes = {
  intl: PropTypes.object.isRequired,
  value: (props, propName, componentName) => {
    if (!/^\d{2}:\d{2}(:\d{2}(:\d{3})?)?$/.test(props[propName])) {
      return new Error('Invalid prop `' + propName + '` supplied to `' + componentName + '`')
    }
  }
}

export default injectIntl(TimeFormatter)
