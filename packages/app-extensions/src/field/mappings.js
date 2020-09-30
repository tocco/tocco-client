import editableValueFactory from './editableValueFactory'
import formattedValueFactory from './formattedValueFactory'

const editableMapping = {
  'binary': editableValueFactory('document'),
  'birthdate': editableValueFactory('date'),
  'boolean': editableValueFactory('boolean'),
  'char': editableValueFactory('string'),
  'code': editableValueFactory('text'),
  'count': editableValueFactory('string'),
  'counter': editableValueFactory('number'),
  'createts': editableValueFactory('datetime'),
  'createuser': editableValueFactory('string'),
  'compressed-text': editableValueFactory('text'),
  'date': editableValueFactory('date'),
  'datetime': editableValueFactory('datetime'),
  'decimal': editableValueFactory('number'),
  'display': formattedValueFactory('html'),
  'description': formattedValueFactory('description'),
  'document': editableValueFactory('document'),
  'double': editableValueFactory('decimal'),
  'duration': editableValueFactory('duration'),
  'email': editableValueFactory('string'),
  'fulltext-search': editableValueFactory('string'),
  'html': editableValueFactory('html'),
  'image': editableValueFactory('document'),
  'identifier': editableValueFactory('string'),
  'integer': editableValueFactory('number'),
  'ipaddress': editableValueFactory('string'),
  'latitude': editableValueFactory('string'),
  'location': editableValueFactory('location'),
  'login': editableValueFactory('string'),
  'long': editableValueFactory('number'),
  'longitude': editableValueFactory('string'),
  'moneyamount': editableValueFactory('number'),
  'multi-remote-field': editableValueFactory('multi-remote'),
  'multi-select-box': editableValueFactory('multi-select'),
  'named-upload': editableValueFactory('document'),
  'percent': editableValueFactory('number'),
  'phone': editableValueFactory('phone'),
  'postcode': editableValueFactory('string'),
  'pulldown-date': editableValueFactory('date'),
  'search-filter': editableValueFactory('search-filter'),
  'serial': editableValueFactory('string'),
  'single-remote-field': editableValueFactory('remote'),
  'single-select-box': editableValueFactory('single-select'),
  'sorting': editableValueFactory('number'),
  'string': editableValueFactory('string'),
  'text': editableValueFactory('text'),
  'text-area': editableValueFactory('text'),
  'time': editableValueFactory('time'),
  'updatets': editableValueFactory('datetime'),
  'upload': editableValueFactory('document'),
  'url': editableValueFactory('url'),
  'uuid': editableValueFactory('string'),
  'version': editableValueFactory('string')
}
const readOnlyMapping = {
  'binary': formattedValueFactory('document'),
  'birthdate': formattedValueFactory('birthdate'),
  'boolean': formattedValueFactory('boolean'),
  'code': formattedValueFactory('text'),
  'counter': formattedValueFactory('string'),
  'createuser': formattedValueFactory('string'),
  'createts': formattedValueFactory('datetime'),
  'compressed-text': formattedValueFactory('text'),
  'data-amount': formattedValueFactory('number'),
  'date': formattedValueFactory('date'),
  'datetime': formattedValueFactory('datetime'),
  'time': formattedValueFactory('time'),
  'decimal': formattedValueFactory('decimal'),
  'display': formattedValueFactory('html'),
  'description': formattedValueFactory('description'),
  'duration': formattedValueFactory('duration'),
  'document': formattedValueFactory('document'),
  'email': formattedValueFactory('email'),
  'html': formattedValueFactory('html'),
  'image': formattedValueFactory('document'),
  'identifier': formattedValueFactory('string'),
  'latitude': formattedValueFactory('latitude'),
  'login': formattedValueFactory('string'),
  'long': formattedValueFactory('string'),
  'longitude': formattedValueFactory('longitude'),
  'moneyamount': formattedValueFactory('moneyamount'),
  'multi-remote-field': formattedValueFactory('multi-remote'),
  'multi-select-box': formattedValueFactory('multi-select'),
  'named-upload': formattedValueFactory('document'),
  'integer': formattedValueFactory('number'),
  'percent': formattedValueFactory('number'),
  'phone': formattedValueFactory('phone'),
  'pulldown-date': formattedValueFactory('date'),
  'remote': formattedValueFactory('remote'),
  'search-filter': formattedValueFactory('search-filter'),
  'single-remote-field': formattedValueFactory('remote'),
  'single-select-box': formattedValueFactory('single-select'),
  'sorting': formattedValueFactory('number'),
  'string': formattedValueFactory('string'),
  'text': formattedValueFactory('text'),
  'text-area': formattedValueFactory('text'),
  'upload': formattedValueFactory('document'),
  'url': formattedValueFactory('url'),
  'uuid': formattedValueFactory('string')
}

const listMapping = {
  ...readOnlyMapping,
  binary: formattedValueFactory('document-compact'),
  document: formattedValueFactory('document-compact'),
  image: formattedValueFactory('document-compact')
}

const searchMapping = {
  ...editableMapping,
  text: editableValueFactory('string'),
  birthdate: editableValueFactory('date', true),
  date: editableValueFactory('date', true),
  updatets: editableValueFactory('datetime', true),
  createts: editableValueFactory('datetime', true),
  datetime: editableValueFactory('datetime', true),
  moneyamount: editableValueFactory('number', true),
  percent: editableValueFactory('number', true),
  long: editableValueFactory('number', true),
  integer: editableValueFactory('number', true),
  decimal: editableValueFactory('number', true),
  counter: editableValueFactory('number', true),
  time: editableValueFactory('time', true)
}

export default {
  editable: editableMapping,
  readOnly: readOnlyMapping,
  list: listMapping,
  search: searchMapping
}
