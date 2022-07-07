import parsePhoneNumber from 'libphonenumber-js'
import _isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'

import Link from '../../Link'
import Typography from '../../Typography'

const LibPhoneFormatter = ({value, breakWords}) => {
  const parsed = parsePhoneNumber(value)
  const formattedInput = _isEmpty(parsed) ? value : parsed.formatInternational()

  return (
    <Typography.Span breakWords={breakWords}>
      <Link href={`tel:${value}`} target="_blank" onClick={e => e.stopPropagation()}>
        {formattedInput}
      </Link>
    </Typography.Span>
  )
}

LibPhoneFormatter.propTypes = {
  value: PropTypes.string,
  breakWords: PropTypes.bool
}

export default LibPhoneFormatter
