import {format} from 'date-fns'
import PropTypes from 'prop-types'
import {FormattedDate, injectIntl} from 'react-intl'

import Typography from '../../Typography'

export const DateTimeFormatter = ({value, intl}) => {
  const date = new Date(value)
  if (!value || isNaN(date)) {
    // eslint-disable-next-line no-console
    console.error('DateTimeFormatter: Invalid date', value)
    return <Typography.Span />
  }

  // show alwas 24h format
  const formattedTime = format(date, 'HH:mm')

  return (
    <Typography.Time dateTime={date.toISOString()} title={`${intl.formatDate(date)}, ${formattedTime}`}>
      <FormattedDate value={date} year="numeric" month="2-digit" day="2-digit" />
      ,&nbsp;
      {formattedTime}
    </Typography.Time>
  )
}

DateTimeFormatter.propTypes = {
  intl: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

export default injectIntl(DateTimeFormatter)
