import React from 'react'

import MultiSelect from './typeEditors/MultiSelect'
import StringEdit from './typeEditors/StringEdit'

export const map = {
  'string': StringEdit,
  'multi-select': MultiSelect
}

export default (type, value, onChange, options, id) => {
  if (map[type]) {
    return React.createElement(map[type], {value, onChange, options, id})
  }

  console.error('No type-editor defined for type', type)
  return null
}

