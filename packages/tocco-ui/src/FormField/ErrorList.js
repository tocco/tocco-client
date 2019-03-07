import PropTypes from 'prop-types'
import React from 'react'

import SignalList from '../SignalList'

const ErrorList = props => {
  if (!props.error) {
    return null
  }

  const errorValues = []
  Object.keys(props.error).forEach(key => {
    errorValues.push(...props.error[key])
  })

  return (
    <SignalList.List>
      {errorValues.map((value, idx) => (
        <SignalList.Item
          condition="danger"
          key={idx}
          label={value}
        />
      ))}
    </SignalList.List>
  )
}

ErrorList.propTypes = {
  error: PropTypes.objectOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string]))
  ).isRequired
}

export default ErrorList
