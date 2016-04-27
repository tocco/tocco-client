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

      injectReducer(store, { key: 'list', reducer: listReducer })
      injectReducer(store, { key: 'searchTerm', reducer: searchTermReducer })

      next(null, List)
    })
  }
})
