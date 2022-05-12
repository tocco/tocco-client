import boolean from './boolean'
import booleanSelect from './booleanSelect'
import code from './code'
import decimal from './decimal'
import document from './document'
import duration from './duration'
import html from './html'
import integer from './integer'
import location from './location'
import moneyamount from './moneyamount'
import number from './number'
import percent from './percent'
import phone from './phone'
import remote from './remote'
import searchFilter from './searchFilter'
import select from './select'

const editableMapping = {
  binary: document,
  boolean: boolean,
  code: code,
  counter: number,
  'data-amount': number,
  decimal: decimal,
  document: document,
  double: decimal,
  duration: duration,
  html: html,
  image: document,
  integer: integer,
  location: location,
  long: integer,
  moneyamount: moneyamount,
  marking: boolean,
  'multi-remote-field': remote,
  'multi-select-box': select,
  'named-upload': document,
  number: number,
  phone: phone,
  'search-filter': searchFilter,
  'single-remote-field': remote,
  'single-select-box': select,
  sorting: number,
  percent: percent
}

const listMapping = {
  ...editableMapping
}

const readOnlyMapping = {
  ...editableMapping
}

const searchMapping = {
  ...editableMapping,
  boolean: booleanSelect
}

export default {
  editable: editableMapping,
  readOnly: readOnlyMapping,
  list: listMapping,
  search: searchMapping
}
