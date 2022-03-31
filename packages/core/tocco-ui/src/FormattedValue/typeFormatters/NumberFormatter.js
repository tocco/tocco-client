import PropTypes from 'prop-types'
import {FormattedNumber} from 'react-intl'

import Typography from '../../Typography'

const NumberFormatter = props => {
  return (
    <Typography.Span breakWords={props.breakWords}>
      <FormattedNumber
        value={props.value}
        style="decimal"
        minimumFractionDigits={props.options ? props.options.postPointDigits || 2 : 2}
      />
    </Typography.Span>
  )
}

NumberFormatter.propTypes = {
  value: PropTypes.number,
  options: PropTypes.shape({
    postPointDigits: PropTypes.number
  }),
  breakWords: PropTypes.bool
}

export default NumberFormatter
