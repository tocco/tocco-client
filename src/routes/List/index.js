import { injectReducer } from '../../store/reducers'

export default (store) => ({
  getComponent (nextState, next) {
    require.ensure([
      './containers/ListPageContainer',
      './modules/list'
    ], (require) => {
      const List = require('./containers/ListPageContainer').default
      const listReducer = require('./modules/list').default
      const searchTermReducer = require('./modules/searchTerm').default
      const liveSearchReducer = require('./modules/liveSearch').default

      injectReducer(store, { key: 'list', reducer: listReducer })
      injectReducer(store, { key: 'searchTerm', reducer: searchTermReducer })
      injectReducer(store, { key: 'liveSearch', reducer: liveSearchReducer })

      next(null, List)
    })
  }
})
