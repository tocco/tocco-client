import React from 'react'
import _isEmpty from 'lodash/isEmpty'

import SingleSelect from './typeEditors/SingleSelect'
import MultiSelect from './typeEditors/MultiSelect'
import StringEdit from './typeEditors/StringEdit'
import TextEdit from './typeEditors/TextEdit'
import DateEdit from './typeEditors/DateEdit'
import MultiDateEdit from './typeEditors/MultiDateEdit'
import DateRangeEdit from './typeEditors/DateRangeEdit'
import DateTimeEdit from './typeEditors/DateTimeEdit'
import BoolEdit from './typeEditors/BoolEdit'
import NumberEdit from './typeEditors/NumberEdit'
import Document from './typeEditors/Document'
import HtmlEdit from './typeEditors/HtmlEdit'
import RemoteSelect from './typeEditors/RemoteSelect'
import MultiRemoteSelect from './typeEditors/MultiRemoteSelect'
import SearchFilterEdit from './typeEditors/SearchFilterEdit'
import UrlEdit from './typeEditors/UrlEdit'
import PhoneEdit from './typeEditors/PhoneEdit'
import DurationEdit from './typeEditors/DurationEdit'
import DecimalEdit from './typeEditors/DecimalEdit'

export const map = {
  'string': StringEdit,
  'number': NumberEdit,
  'date': DateEdit,
  'multi-date': MultiDateEdit,
  'date-range': DateRangeEdit,
  'birthdate': DateEdit,
  'datetime': DateTimeEdit,
  'count': StringEdit,
  'html': HtmlEdit,
  'phone': PhoneEdit,
  'url': UrlEdit,
  'document': Document,
  'boolean': BoolEdit,
  'email': StringEdit,
  'counter': StringEdit,
  'text': TextEdit,
  'multi-select': MultiSelect,
  'single-select': SingleSelect,
  'remote': RemoteSelect,
  'multi-remote': MultiRemoteSelect,
  'search-filter': SearchFilterEdit,
  'createuser': StringEdit,
  'createts': DateTimeEdit,
  'duration': DurationEdit,
  'decimal': DecimalEdit
}

export default (type, value, onChange, options, id, events, readOnly = false) => {
  if (map[type]) {
    const Component = map[type]

    // blur workaround for known react-select issue: https://github.com/erikras/redux-form/issues/82
    // Date component only works properly on blur if the event is called with the value saved from the change event
    let blurValue
    if (events && events.onBlur) {
      const onBlur = events.onBlur
      events.onBlur = () => {
        return onBlur(blurValue !== undefined ? blurValue : value)
      }
    }

    return (
      <div {...events}>
        <Component
          value={value}
          onChange={v => {
            blurValue = v
            onChange(v)
          }}
          {...(_isEmpty(options) ? {} : {options})}
          id={id}
          readOnly={readOnly}
          events={events}
        />
      </div>
    )
  }

  // eslint-disable-next-line no-console
  console.log('No type-editor defined for type', type)
  return null
}
