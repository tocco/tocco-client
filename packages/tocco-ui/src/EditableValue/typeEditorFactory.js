import React from 'react'
import _isEmpty from 'lodash/isEmpty'
import _omit from 'lodash/omit'

import SingleSelect from './typeEditors/SingleSelect'
import MultiSelect from './typeEditors/MultiSelect'
import StringEdit from './typeEditors/StringEdit'
import TextEdit from './typeEditors/TextEdit'
import DateEdit from './typeEditors/DateEdit'
import DateRangeEdit from './typeEditors/DateRangeEdit'
import DateTimeEdit from './typeEditors/DateTimeEdit'
import TimeEdit from './typeEditors/TimeEdit'
import BoolEdit from './typeEditors/BoolEdit'
import Document from './typeEditors/Document'
import HtmlEdit from './typeEditors/HtmlEdit'
import RemoteSelect from './typeEditors/RemoteSelect'
import MultiRemoteSelect from './typeEditors/MultiRemoteSelect'
import SearchFilterEdit from './typeEditors/SearchFilterEdit'
import UrlEdit from './typeEditors/UrlEdit'
import PhoneEdit from './typeEditors/PhoneEdit'
import DurationEdit from './typeEditors/DurationEdit'
import NumberEdit from './typeEditors/NumberEdit'
import LocationEdit from './typeEditors/LocationEdit'

export const map = {
  'binary': Document,
  'birthdate': DateEdit,
  'boolean': BoolEdit,
  'char': StringEdit,
  'count': StringEdit,
  'counter': NumberEdit,
  'createts': DateTimeEdit,
  'createuser': StringEdit,
  'coordinate': StringEdit,
  'dataamount': NumberEdit,
  'date': DateEdit,
  'date-range': DateRangeEdit,
  'datetime': DateTimeEdit,
  'decimal': NumberEdit,
  'document': Document,
  'double': NumberEdit,
  'duration': DurationEdit,
  'email': StringEdit,
  'html': HtmlEdit,
  'identifier': StringEdit,
  'integer': NumberEdit,
  'ipaddress': StringEdit,
  'latitude': NumberEdit,
  'location': LocationEdit,
  'login': StringEdit,
  'long': NumberEdit,
  'longitude': NumberEdit,
  'moneyamount': NumberEdit,
  'multi-remote': MultiRemoteSelect,
  'multi-select': MultiSelect,
  'number': NumberEdit,
  'percent': NumberEdit,
  'phone': PhoneEdit,
  'postcode': StringEdit,
  'remote': RemoteSelect,
  'search-filter': SearchFilterEdit,
  'single-select': SingleSelect,
  'sorting': NumberEdit,
  'string': StringEdit,
  'text': TextEdit,
  'url': UrlEdit,
  'uuid': StringEdit,
  'version': NumberEdit,
  'time': TimeEdit
}

export default (type, value, options, id, events, readOnly = false) => {
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
      <div {..._omit(events, 'onChange')}>
        <Component
          value={value}
          onChange={v => {
            blurValue = v
            events.onChange(v)
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
