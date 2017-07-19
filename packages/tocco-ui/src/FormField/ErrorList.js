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
  error: React.PropTypes.objectOf(
    React.PropTypes.arrayOf(React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.string]))
  ).isRequired
}

export default ErrorList
