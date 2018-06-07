import PropTypes from 'prop-types'
import React from 'react'
import {FormattedNumber} from 'react-intl'

import {Span} from '../../Typography'

const DecimalFormatter = props => {
  return (
    <Span>
      <FormattedNumber
        value={props.value}
        style="decimal"
        minimumFractionDigits={2}
      />
    </Span>
  )
}

DecimalFormatter.propTypes = {
  value: PropTypes.number.isRequired
}

export default DecimalFormatter
