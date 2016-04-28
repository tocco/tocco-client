import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'detail/:eventKey',
  getComponent (nextState, next) {
    require.ensure([
      './containers/DetailPageContainer'
    ], (require) => {
      const DetailPage = require('./containers/DetailPageContainer').default
      const activeEventReducer = require('./modules/activeEvent').default

      injectReducer(store, { key: 'activeEvent', reducer: activeEventReducer })

      next(null, DetailPage)
    })
  }
})
