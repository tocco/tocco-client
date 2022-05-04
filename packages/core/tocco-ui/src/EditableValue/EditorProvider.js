import _isEmpty from 'lodash/isEmpty'
import _omit from 'lodash/omit'
import PropTypes from 'prop-types'

import BooleanSingleSelect from './editors/BooleanSingleSelect'
import BoolEdit from './editors/BoolEdit'
import CodeEdit from './editors/CodeEdit'
import DateEdit from './editors/DateEdit'
import DateTimeEdit from './editors/DateTimeEdit'
import Document from './editors/Document'
import DurationEdit from './editors/DurationEdit'
import HtmlEdit from './editors/HtmlEdit'
import IntegerEdit from './editors/IntegerEdit'
import LocationEdit from './editors/LocationEdit'
import MultiRemoteSelect from './editors/MultiRemoteSelect'
import MultiSelect from './editors/MultiSelect'
import NumberEdit from './editors/NumberEdit'
import PhoneEdit from './editors/PhoneEdit'
import RemoteSelect from './editors/RemoteSelect'
import SearchFilterEdit from './editors/SearchFilterEdit'
import SingleSelect from './editors/SingleSelect'
import StringEdit from './editors/StringEdit'
import TextEdit from './editors/TextEdit'
import TimeEdit from './editors/TimeEdit'
import UrlEdit from './editors/UrlEdit'

/**
 * Mapping: componentType (e.g. document) to component
 */
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

const EditorProvider = ({componentType, value, options, id, events, placeholder, readOnly = false}) => {
  if (map[componentType]) {
    const Component = map[componentType]

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
  console.log('No type-editor defined for component type', componentType)
  return null
}

EditorProvider.propTypes = {
  componentType: PropTypes.oneOf(Object.keys(map)).isRequired,
  events: PropTypes.objectOf(PropTypes.func),
  id: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  options: PropTypes.object,
  value: PropTypes.any
}

export default EditorProvider
