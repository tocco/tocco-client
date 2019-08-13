import PropTypes from 'prop-types'
import React from 'react'

import SingleSelectFormatter from './SingleSelectFormatter'

const MultiSelectFormatter = ({value, options}) =>
  value && value.length > 0
    ? value
      .map((v, idx) => <SingleSelectFormatter key={idx} value={v} options={options}/>)
      .reduce((prev, curr) => [prev, ', ', curr])
    : null

MultiSelectFormatter.propTypes = {
  value: PropTypes.array,
  options: PropTypes.shape({
    linkFactory: PropTypes.func
  })
}

export default MultiSelectFormatter
