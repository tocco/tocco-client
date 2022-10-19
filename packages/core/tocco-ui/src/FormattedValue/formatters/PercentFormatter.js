import PropTypes from 'prop-types'
import {FormattedNumber} from 'react-intl'

import Typography from '../../Typography'

const PercentFormatter = props => (
  <Typography.Span breakWords={props.breakWords}>
    <FormattedNumber value={props.value} style="percent" minimumFractionDigits={props?.options?.postPointDigits} />
  </Typography.Span>
)

PercentFormatter.propTypes = {
  value: PropTypes.number.isRequired,
  options: PropTypes.shape({
    postPointDigits: PropTypes.number
  }),
  breakWords: PropTypes.bool
}

export default PercentFormatter
