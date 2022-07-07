import PropTypes from 'prop-types'

import Link from '../../Link'
import Typography from '../../Typography'

const EmailFormatter = props => (
  <Typography.Span breakWords={props.breakWords}>
    <Link href={`mailto:${props.value.toString()}`} target="_blank" onClick={e => e.stopPropagation()}>
      {props.value.toString()}
    </Link>
  </Typography.Span>
)

EmailFormatter.propTypes = {
  value: PropTypes.any,
  breakWords: PropTypes.bool
}

export default EmailFormatter
