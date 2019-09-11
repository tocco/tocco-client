import PropTypes from 'prop-types'
import React from 'react'

import Typography from '../../Typography'
import SingleSelectFormatter from './SingleSelectFormatter'

const MultiSeparator = () => <Typography.Span>, </Typography.Span>

const MultiSelectFormatter = ({value, options}) =>
  value && value.length > 0
    ? value
      .map((v, idx) => <SingleSelectFormatter key={idx} value={v} options={options}/>)
      .reduce((prev, curr, idx) => [prev, <MultiSeparator key={'sep' + idx}/>, curr])
    : null

MultiSelectFormatter.propTypes = {
  value: PropTypes.array,
  options: PropTypes.shape({
    linkFactory: PropTypes.func
  })
}

export default MultiSelectFormatter
