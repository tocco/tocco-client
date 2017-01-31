import React from 'react'

import SingleSelect from './typeEditors/SingleSelect'
import MultiSelect from './typeEditors/MultiSelect'
import StringEdit from './typeEditors/StringEdit'
import TextEdit from './typeEditors/TextEdit'
import DateEdit from './typeEditors/DateEdit'
import DateTimeEdit from './typeEditors/DateTimeEdit'
import BoolEdit from './typeEditors/BoolEdit'
import NumberEdit from './typeEditors/NumberEdit'

export const map = {
  'string': StringEdit,
  'number': NumberEdit,
  'date': DateEdit,
  'birthdate': DateEdit,
  'datetime': DateTimeEdit,
  'count': StringEdit,
  'phone': StringEdit,
  'url': StringEdit,
  'boolean': BoolEdit,
  'email': StringEdit,
  'counter': StringEdit,
  'text': TextEdit,
  'multi-select': MultiSelect,
  'single-select': SingleSelect
}

export default (type, value, onChange, options, id, events, readOnly = false) => {
  if (map[type]) {
    return React.createElement(map[type], {value, onChange, options, id, events, readOnly})
  }

  console.info('No type-editor defined for type', type)
  return null
}

