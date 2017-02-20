import React from 'react'

const FieldErrorList = props => {
  if (!props.errors) {
    return null
  }

  let errorValues = []
  Object.keys(props.errors).map(key => {
    errorValues = [...errorValues, ...props.errors[key]]
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
