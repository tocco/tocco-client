import PropTypes from 'prop-types'
import {FormattedDate, FormattedTime, injectIntl} from 'react-intl'

import Typography from '../../Typography'

export const DateTimeFormatter = ({value, intl}) => {
  const date = new Date(value)
  if (!value || isNaN(date)) {
    // eslint-disable-next-line no-console
    console.error('DateTimeFormatter: Invalid date', value)
    return <Typography.Span />
  }

  return (
    <Typography.Time dateTime={date.toISOString()} title={`${intl.formatDate(date)}, ${intl.formatTime(date)}`}>
      <FormattedDate value={date} year="numeric" month="2-digit" day="2-digit" />
      ,&nbsp;
      <FormattedTime value={date} />
    </Typography.Time>
  )
}

DateTimeFormatter.propTypes = {
  intl: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

export default injectIntl(DateTimeFormatter)
