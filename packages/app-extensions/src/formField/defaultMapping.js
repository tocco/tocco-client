import editableValueFactory from './editableValueFactory'
import formattedValueFactory from './formattedValueFactory'

export default {
  'binary': editableValueFactory('document'),
  'birthdate': editableValueFactory('birthdate'),
  'boolean': editableValueFactory('boolean'),
  'code': editableValueFactory('code'),
  'counter': editableValueFactory('number'),
  'date': editableValueFactory('date'),
  'datetime': editableValueFactory('datetime'),
  'createts': editableValueFactory('datetime'),
  'updatets': editableValueFactory('datetime'),
  'decimal': editableValueFactory('decimal'),
  'display': formattedValueFactory('html'),
  'double': editableValueFactory('decimal'),
  'duration': editableValueFactory('duration'),
  'document': editableValueFactory('document'),
  'email': editableValueFactory('email'),
  'html': editableValueFactory('html'),
  'image': editableValueFactory('document'),
  'identifier': editableValueFactory('string'),
  'latitude': editableValueFactory('coordinate'),
  'login': editableValueFactory('string'),
  'createuser': editableValueFactory('string'),
  'long': editableValueFactory('integer'),
  'longitude': editableValueFactory('coordinate'),
  'location': editableValueFactory('location'),
  'moneyamount': editableValueFactory('moneyamount'),
  'multi-remote-field': editableValueFactory('multi-remote'),
  'multi-select-box': editableValueFactory('multi-select'),
  'named-upload': editableValueFactory('document'),
  'integer': editableValueFactory('integer'),
  'percent': editableValueFactory('number'),
  'phone': editableValueFactory('phone'),
  'pulldown-date': editableValueFactory('date-range'),
  'range': {
    number: editableValueFactory('number'),
    counter: editableValueFactory('number'),
    date: editableValueFactory('date-range'),
    birthdate: editableValueFactory('date-range')
  },
  'single-remote-field': editableValueFactory('remote'),
  'search-filter': editableValueFactory('search-filter'),
  'single-select-box': editableValueFactory('single-select'),
  'sorting': editableValueFactory('integer'),
  'string': editableValueFactory('string'),
  'text': editableValueFactory('text'),
  'time': editableValueFactory('time'),
  'text-area': editableValueFactory('text'),
  'upload': editableValueFactory('document'),
  'url': editableValueFactory('url'),
  'uuid': editableValueFactory('string'),
  'ch.tocco.nice2.model.form.components.simple.UploadField': editableValueFactory('document'),
  'ch.tocco.nice2.model.form.components.simple.UuidField': editableValueFactory('string'),
  'version': editableValueFactory('string'),
  'serial': editableValueFactory('string')
}
