import { injectReducer } from '../../store/reducers'
import { sagaMiddleware } from '../../store/createStore'

export default (store) => ({
  getComponent (nextState, next) {
    require.ensure([
      './containers/ListPageContainer',
      './modules/data',
      './modules/entityModel',
      './modules/ordering',
      './modules/searchTerm',
    ], (require) => {
      const List = require('./containers/ListPageContainer').default

      const mainModule = require('./modules/main')
      const reducer = mainModule.default
      const sagas = mainModule.sagas

      injectReducer(store, { key: 'list', reducer })
      sagaMiddleware.run(sagas)

      next(null, List)
    })
  }
})
