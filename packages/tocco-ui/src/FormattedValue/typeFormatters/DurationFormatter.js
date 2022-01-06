import PropTypes from 'prop-types'
import React from 'react'
import {date} from 'tocco-util'

import Typography from '../../Typography'

const DurationFormatter = ({value}) => {
  const milliSeconds = parseInt(value)

  const duration = date.formatDuration(milliSeconds)

  return (
    <Typography.Time dateTime={duration} title={duration}>
      {duration}
    </Typography.Time>
  )
}

DurationFormatter.propTypes = {
  value: PropTypes.number
}

export default DurationFormatter
