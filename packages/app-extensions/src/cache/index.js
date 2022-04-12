import {initialise} from './actions'
import {
  addShortTerm,
  addLongTerm,
  getShortTerm,
  getLongTerm,
  removeShortTerm,
  removeLongTerm,
  clearShortTerm,
  clearAll,
  addToStore
} from './cache'
import CacheInitLoadMask from './CacheInitLoadMask'
import {hasInvalidCache} from './utils'

export default {
  addShortTerm,
  addLongTerm,
  getShortTerm,
  getLongTerm,
  removeShortTerm,
  removeLongTerm,
  clearShortTerm,
  clearAll,
  addToStore,
  initialise,
  CacheInitLoadMask,
  hasInvalidCache
}
