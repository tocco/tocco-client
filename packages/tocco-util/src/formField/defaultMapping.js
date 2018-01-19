import editableValueFactory from './editableValueFactory'
import formattedValueFactory from './formattedValueFactory'

export default {
  'birthdate': editableValueFactory('birthdate'),
  'boolean': editableValueFactory('boolean'),
  'counter': editableValueFactory('string'),
  'text': editableValueFactory('text'),
  'data-amount': editableValueFactory('number'),
  'date': editableValueFactory('date'),
  'datetime': editableValueFactory('datetime'),
  'display': formattedValueFactory('html'),
  'document': editableValueFactory('document'),
  'email': editableValueFactory('email'),
  'html': editableValueFactory('text'),
  'image': editableValueFactory('document'),
  'login': editableValueFactory('string'),
  'money-amount': editableValueFactory('number'),
  'multi-remote-field': editableValueFactory('multi-remote'),
  'multi-select-box': editableValueFactory('multi-select'),
  'named-upload': editableValueFactory('document'),
  'integer': editableValueFactory('number'),
  'percent': editableValueFactory('number'),
  'phone': editableValueFactory('phone'),
  'range': {
    'number': editableValueFactory('number'),
    'counter': editableValueFactory('number'),
    'date': editableValueFactory('date-range'),
    'birthdate': editableValueFactory('date-range')
  },
  'single-remote-field': editableValueFactory('remote'),
  'search-filter': editableValueFactory('search-filter'),
  'single-select-box': editableValueFactory('single-select'),
  'string': editableValueFactory('string'),
  'ch.tocco.nice2.model.form.components.simple.UploadField': editableValueFactory('document'),
  'url': editableValueFactory('url'),
  'ch.tocco.nice2.model.form.components.simple.UuidField': editableValueFactory('string')
}
