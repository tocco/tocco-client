import _isEmpty from 'lodash/isEmpty'
import _omit from 'lodash/omit'
import PropTypes from 'prop-types'
import React, {useRef, useCallback} from 'react'

import BoolEdit from './typeEditors/BoolEdit'
import CodeEdit from './typeEditors/CodeEdit'
import DateEdit from './typeEditors/DateEdit'
import DateTimeEdit from './typeEditors/DateTimeEdit'
import Document from './typeEditors/Document'
import DurationEdit from './typeEditors/DurationEdit'
import EmailEdit from './typeEditors/EmailEdit'
import HtmlEdit from './typeEditors/HtmlEdit'
import IntegerEdit from './typeEditors/IntegerEdit'
import LocationEdit from './typeEditors/LocationEdit'
import MultiRemoteSelect from './typeEditors/MultiRemoteSelect'
import MultiSelect from './typeEditors/MultiSelect'
import NumberEdit from './typeEditors/NumberEdit'
import PhoneEdit from './typeEditors/PhoneEdit'
import RemoteSelect from './typeEditors/RemoteSelect'
import SearchFilterEdit from './typeEditors/SearchFilterEdit'
import SingleSelect from './typeEditors/SingleSelect'
import StringEdit from './typeEditors/StringEdit'
import TextEdit from './typeEditors/TextEdit'
import TimeEdit from './typeEditors/TimeEdit'
import UrlEdit from './typeEditors/UrlEdit'

export const map = {
  boolean: BoolEdit,
  code: CodeEdit,
  date: DateEdit,
  datetime: DateTimeEdit,
  document: Document,
  duration: DurationEdit,
  email: EmailEdit,
  html: HtmlEdit,
  integer: IntegerEdit,
  location: LocationEdit,
  'multi-remote': MultiRemoteSelect,
  'multi-select': MultiSelect,
  number: NumberEdit,
  phone: PhoneEdit,
  remote: RemoteSelect,
  'search-filter': SearchFilterEdit,
  'single-select': SingleSelect,
  string: StringEdit,
  text: TextEdit,
  url: UrlEdit,
  time: TimeEdit
}

const isFlatpickrType = type => ['date', 'datetime'].includes(type)

const TypeEditorFactory = ({type, value, options, id, events, placeholder, readOnly = false}) => {
  const flatpickrBlurValue = useRef(undefined)

  const onChange = events?.onChange
  const callback = useCallback(
    v => {
      flatpickrBlurValue.current = v
      if (onChange) {
        onChange(v)
      }
    },
    [onChange]
  )

  if (map[type]) {
    const Component = map[type]

    /**
     * blur workaround
     * - for known react-select issue: https://github.com/erikras/redux-form/issues/82
     * - for flatpickr components on firefox: https://toccoag.atlassian.net/browse/TOCDEV-5036
     */
    if (events && events.onBlur) {
      const onBlur = events.onBlur
      events.onBlur = () => {
        const actualBlurValue =
          isFlatpickrType(type) && flatpickrBlurValue.current !== undefined ? flatpickrBlurValue.current : value
        return onBlur(actualBlurValue)
      }
    }

    return (
      <div {..._omit(events, 'onChange')} data-cy="form-field">
        <Component
          value={value}
          onChange={callback}
          {...(_isEmpty(options) ? {} : {options})}
          id={id}
          immutable={readOnly}
          placeholder={placeholder}
          events={events}
        />
      </div>
    )
  }

  // eslint-disable-next-line no-console
  console.log('No type-editor defined for type', type)
  return null
}

TypeEditorFactory.propTypes = {
  type: PropTypes.oneOf(Object.keys(map)).isRequired,
  events: PropTypes.objectOf(PropTypes.func),
  id: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  options: PropTypes.object,
  value: PropTypes.any
}

export default TypeEditorFactory
