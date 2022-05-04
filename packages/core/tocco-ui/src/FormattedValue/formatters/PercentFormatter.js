import PropTypes from 'prop-types'

import Typography from '../../Typography'
import NumberFormatter from './NumberFormatter'

const PercentFormatter = props => (
  <Typography.Span>
    <NumberFormatter value={props.value} />%
  </Typography.Span>
)

PercentFormatter.propTypes = {
  value: PropTypes.number.isRequired
}

export default PercentFormatter
