import React from 'react'
import {storeFactory} from 'tocco-util'
import asyncRoute from '../../util/asyncRoute'

export default store => props => {
  const Component = asyncRoute(() =>
    new Promise(resolve => {
      require.ensure([], require => {
        const EntityBrowserContainer = require('./containers/EntityBrowserContainer').default

        const reducer = require('./modules').default
        const toastrReducer = require('react-redux-toastr').reducer

        const sagas = require('./modules/sagas').default

        storeFactory.injectReducers(store, {
          entityBrowser: reducer,
          toastr: toastrReducer
        })

        storeFactory.injectSaga(store, sagas)

        resolve(EntityBrowser)
      })
    })
  )
  return <EntityBrowserContainer {...props}/>
}
