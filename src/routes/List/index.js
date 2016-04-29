import { injectReducer } from '../../store/reducers'

export default (store) => ({
  getComponent (nextState, next) {
    require.ensure([
      './containers/ListPageContainer',
      './modules/list'
    ], (require) => {
      const List = require('./containers/ListPageContainer').default
      const reducer = require('./modules/main').default

      injectReducer(store, { key: 'list', reducer })

      next(null, List)
    })
  }
})
