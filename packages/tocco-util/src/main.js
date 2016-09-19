import StoreFactory from './store/storeFactory'
import ExternalEvents from './ExternalEvents'
import Intl from './Intl'

var exports = {
  StoreFactory,
  ExternalEvents: new ExternalEvents(),
  Intl
}

module.exports = exports
