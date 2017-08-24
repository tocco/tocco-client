import PropTypes from 'prop-types'
import React from 'react'

const ErrorList = props => {
  if (!props.error) {
    return null
  }

  const errorValues = []
  Object.keys(props.error).forEach(key => {
    errorValues.push(...props.error[key])
  })

  return (
    <ul className="icon-list">
      {errorValues.map((value, idx) => (
        <li className="text-danger" key={idx}>{value}</li>
      ))}
    </ul>
  )
}

ErrorList.propTypes = {
  error: PropTypes.objectOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string]))
  ).isRequired
}

export default ErrorList
