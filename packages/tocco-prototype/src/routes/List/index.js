import { injectReducer } from '../../store/reducers'
import { sagaMiddleware } from '../../store/createStore'
import { setEntityModel } from './modules/entityModel/actions'
import {updateSearchTerm} from './modules/searchTerm/actions'

function dispatchInput(store) {
  const state = store.getState()
  if (state.input) {
    const { input } = state

    if (input.entityName) {
      store.dispatch(setEntityModel(state.input.entityName))
    }

    if (input.selectedEntities && input.selectedEntities.length > 0) {
      const query = input.selectedEntities.map(k => `pk:${k}`).join(' OR ')
      store.dispatch(updateSearchTerm(query))
    }
  }
}

export default store => ({
  getComponent(nextState, next) {
    require.ensure([
      './containers/ListPageContainer',
      './modules/data',
      './modules/entityModel',
      './modules/ordering',
      './modules/searchTerm'
    ], require => {
      const List = require('./containers/ListPageContainer').default

      const mainModule = require('./modules/main')
      const reducer = mainModule.default
      const sagas = mainModule.sagas

      injectReducer(store, { key: 'list', reducer })
      sagaMiddleware.run(sagas)

      dispatchInput(store)

      next(null, List)
    })
  }
})
