import PropTypes from 'prop-types'
import React from 'react'

const SingleSelectFormatter = props => (
  <span>{props.value.display}</span>
)

SingleSelectFormatter.propTypes = {
  value: PropTypes.object
}

export default SingleSelectFormatter
