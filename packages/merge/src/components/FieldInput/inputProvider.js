import React from 'react'
import StringInput from './typeInputs/StringInput'

export default function(field, onChange, disabled) {
  if (map[field.type]) {
    return React.createElement(
      map[field.type],
      {
        name: field.name,
        value: field.value,
        onChange,
        disabled
      }
    )
  }

  console.log('no input defined for type', field.type, field)
  return React.createElement('div')
}

const map = {
  'string': StringInput
}
