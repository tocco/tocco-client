import React from 'react'

const FieldErrorList = props => {
  if (!props.errors) {
    return null
  }

  const errorValues = []
  Object.keys(props.errors).forEach(key => {
    errorValues.push(...props.errors[key])
  })

  return (
    <ul className="error-list">
      {errorValues.map((value, idx) => (
        <li key={idx}>{value}</li>
      ))}
    </ul>
  )
}

FieldErrorList.propTypes = {
  errors: React.PropTypes.objectOf(
    React.PropTypes.arrayOf(React.PropTypes.string)
  ).isRequired
}

export default FieldErrorList
