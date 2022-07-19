import parsePhoneNumber from 'libphonenumber-js'
import _isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'

import Link from '../../Link'

const LibPhoneFormatter = ({value, breakWords}) => {
  const parsed = parsePhoneNumber(value)
  const formattedInput = _isEmpty(parsed) ? value : parsed.formatInternational()

  return (
    <Link
      href={`tel:${value}`}
      target="_blank"
      onClick={e => e.stopPropagation()}
      label={formattedInput}
      breakWords={breakWords}
    />
  )
}

LibPhoneFormatter.propTypes = {
  value: PropTypes.string,
  breakWords: PropTypes.bool
}

export default LibPhoneFormatter
