import React from 'react'
import {storeFactory} from 'tocco-util'
import asyncRoute from '../../util/asyncRoute'

export default store => props => {
  const Component = asyncRoute(() =>
    new Promise(resolve => {
      require.ensure([], require => {
        const DetailViewContainer = require('./containers/DetailViewContainer').default

        const reducer = require('./modules').default
        const form = require('redux-form').reducer

        const sagas = require('./modules/sagas').default

        storeFactory.injectReducers(store, {
          detail: reducer,
          form
        })

        storeFactory.injectSaga(store, sagas)

        resolve(DetailViewContainer)
      })
    })
  )
  return <Component {...props}/>
}
