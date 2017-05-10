import React from 'react'

const SingleSelectFormatter = props => (
  <span>{props.value.display}</span>
)

SingleSelectFormatter.propTypes = {
  value: React.PropTypes.object
}

export default SingleSelectFormatter
