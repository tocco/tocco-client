import _isEmpty from 'lodash/isEmpty'
import _omit from 'lodash/omit'
import PropTypes from 'prop-types'

import BooleanSingleSelect from './typeEditors/BooleanSingleSelect'
import BoolEdit from './typeEditors/BoolEdit'
import CodeEdit from './typeEditors/CodeEdit'
import DateEdit from './typeEditors/DateEdit'
import DateTimeEdit from './typeEditors/DateTimeEdit'
import Document from './typeEditors/Document'
import DurationEdit from './typeEditors/DurationEdit'
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
  'boolean-select': BooleanSingleSelect,
  code: CodeEdit,
  date: DateEdit,
  datetime: DateTimeEdit,
  document: Document,
  duration: DurationEdit,
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

const TypeEditorFactory = ({type, value, options, id, events, placeholder, readOnly = false}) => {
  if (map[type]) {
    const Component = map[type]

    /**
     * blur workaround
     * - for known react-select issue: https://github.com/erikras/redux-form/issues/82
     */
    if (events && events.onBlur) {
      const onBlur = events.onBlur
      events.onBlur = () => onBlur(value)
    }

    return (
      <div {..._omit(events, 'onChange')} data-cy="form-field">
        <Component
          value={value}
          onChange={events?.onChange}
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