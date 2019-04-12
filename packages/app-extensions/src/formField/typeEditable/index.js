import coordinate from './coordinate'
import document from './document'
import duration from './duration'
import integer from './integer'
import location from './location'
import number from './number'
import phone from './phone'
import remote from './remote'
import select from './select'
import searchFilter from './searchFilter'

export default {
  'coordinate': coordinate,
  'decimal': number,
  'document': document,
  'duration': duration,
  'integer': integer,
  'location': location,
  'multi-remote': remote,
  'multi-select': select,
  'moneyamount': number,
  'number': number,
  'phone': phone,
  'remote': remote,
  'search-filter': searchFilter,
  'single-select': select
}
