import coordinate from './coordinate'
import decimal from './decimal'
import document from './document'
import duration from './duration'
import integer from './integer'
import location from './location'
import moneyamount from './moneyamount'
import number from './number'
import phone from './phone'
import remote from './remote'
import select from './select'
import searchFilter from './searchFilter'

export default {
  'binary': document,
  'coordinate': coordinate,
  'counter': number,
  'data-amount': number,
  'decimal': decimal,
  'document': document,
  'double': decimal,
  'duration': duration,
  'image': document,
  'integer': integer,
  'latitude': coordinate,
  'location': location,
  'longitude': coordinate,
  'moneyamount': moneyamount,
  'multi-remote-field': remote,
  'multi-select-box': select,
  'named-upload': document,
  'number': number,
  'phone': phone,
  'search-filter': searchFilter,
  'single-remote-field': remote,
  'single-select-box': select,
  'sorting': number
}
