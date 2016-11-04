import React from 'react'
import DateFieldLabel from './TypeLabels/DateFieldLabel'
import StringLabel from './TypeLabels/StringLabel'
import UrlFieldLabel from './TypeLabels/UrlFieldLabel'
import DocumentFieldLabel from './TypeLabels/DocumentFieldLabel'

export default function(field) {
  if (map[field.type]) {
    return React.createElement(map[field.type], {value: field.value})
  }

  console.log('no label defined for type', field.type, field)
  return <div/>
}

const map = {
  'string': StringLabel,
  'phone': StringLabel,
  'counter': StringLabel,
  'text': StringLabel,
  'url': UrlFieldLabel,
  'date': DateFieldLabel,
  'birthdate': DateFieldLabel,
  'email': StringLabel,
  'document': DocumentFieldLabel
}
