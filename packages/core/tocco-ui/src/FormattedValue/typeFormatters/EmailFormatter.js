import PropTypes from 'prop-types'

import Link from '../../Link'

const EmailFormatter = props => (
  <Link
    href={`mailto:${props.value.toString()}`}
    target="_blank"
    onClick={e => e.stopPropagation()}
    label={props.value.toString()}
    breakWords={props.breakWords}
  />
)

EmailFormatter.propTypes = {
  value: PropTypes.any,
  breakWords: PropTypes.bool
}

export default EmailFormatter
