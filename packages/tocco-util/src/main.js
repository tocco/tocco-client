import StoreFactory from './store/storeFactory'
import ExternalEvents from './ExternalEvents'

var exports = {
  StoreFactory,
  ExternalEvents: new ExternalEvents()
}

module.exports = exports
