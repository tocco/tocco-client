import PropTypes from 'prop-types'
import React from 'react'

import SingleSelectFormatter from './SingleSelectFormatter'

const MultiSelectFormatter = ({value, options}) =>
  value
    .map((v, idx) => <SingleSelectFormatter key={idx} value={v} options={options}/>)
    .reduce((prev, curr) => [prev, ', ', curr])

MultiSelectFormatter.propTypes = {
  value: PropTypes.array,
  options: PropTypes.shape({
    linkFactory: PropTypes.func
  })
}

export default MultiSelectFormatter
