import React from 'react'
import {storeFactory} from 'tocco-util'
import asyncRoute from '../../util/asyncRoute'

export default store => props => {
  const Component = asyncRoute(() =>
    new Promise(resolve => {
      require.ensure([], require => {
        const ListViewContainer = require('./containers/ListViewContainer').default

        const reducer = require('./modules').default
        const searchFormReducer = require('./modules/searchForm').default

        const sagas = require('./modules/sagas').default
        const searchFormSagas = require('./modules/searchForm/sagas').default

        storeFactory.injectReducers(store, {
          list: reducer,
          searchForm: searchFormReducer
        })

        storeFactory.injectSaga(store, sagas)
        storeFactory.injectSaga(store, searchFormSagas)

        resolve(ListViewContainer)
      })
    })
  )
  return <Component {...props}/>
}
