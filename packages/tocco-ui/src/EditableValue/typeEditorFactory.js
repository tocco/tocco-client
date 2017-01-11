import React from 'react'

import SingleSelect from './typeEditors/SingleSelect'
import MultiSelect from './typeEditors/MultiSelect'
import StringEdit from './typeEditors/StringEdit'
import TextEdit from './typeEditors/TextEdit'

export const map = {
  'string': StringEdit,
  'number': StringEdit,
  'date': StringEdit,
  'birthdate': StringEdit,
  'count': StringEdit,
  'phone': StringEdit,
  'website': StringEdit,
  'boolean': StringEdit,
  'email': StringEdit,
  'counter': StringEdit,
  'text': TextEdit,
  'multi-select': MultiSelect,
  'single-select': SingleSelect
}

export default (type, value, onChange, options, id, events) => {
  if (map[type]) {
    return React.createElement(map[type], {value, onChange, options, id, events})
  }

  console.info('No type-editor defined for type', type)
  return null
}

