import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'detail/:eventKey',
  getComponent (nextState, next) {
    require.ensure([
      './containers/DetailPageContainer'
    ], (require) => {
      const DetailPage = require('./containers/DetailPageContainer').default
      const reducer = require('./modules/detail').default

      injectReducer(store, { key: 'detail', reducer })

      next(null, DetailPage)
    })
  }
})
