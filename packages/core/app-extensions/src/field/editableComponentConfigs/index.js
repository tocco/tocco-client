import boolean from './boolean'
import booleanSelect from './booleanSelect'
import code from './code'
import date from './date'
import datetime from './datetime'
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
  boolean,
  code,
  counter: number,
  'data-amount': number,
  datetime,
  date,
  birthdate: date,
  'pulldown-date': date,
  decimal,
  document,
  double: decimal,
  duration,
  html,
  image: document,
  integer,
  location,
  long: integer,
  moneyamount,
  marking: boolean,
  'multi-remote-field': remote,
  'multi-select-box': select,
  'named-upload': document,
  number,
  phone,
  'search-filter': searchFilter,
  'single-remote-field': remote,
  'single-select-box': select,
  sorting: number,
  percent
}

const listMapping = {
  ...editableMapping
}

const readOnlyMapping = {
  ...editableMapping
}

const searchMapping = {
  ...editableMapping,
  boolean: booleanSelect,
  marking: booleanSelect
}

export default {
  editable: editableMapping,
  readOnly: readOnlyMapping,
  list: listMapping,
  search: searchMapping
}
