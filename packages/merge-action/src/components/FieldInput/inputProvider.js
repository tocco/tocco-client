import React from 'react'
import StringInput from './typeInputs/StringInput'

export default function(field, onChange) {
  if (map[field.type]) {
    return React.createElement(map[field.type], {name: field.name, value: field.value, onChange: onChange})
  }

  console.log('no input defined for type', field.type, field)
  return <div/>
}

var map = {
  'string': StringInput
}
