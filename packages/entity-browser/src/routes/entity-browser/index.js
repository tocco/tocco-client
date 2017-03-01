import React from 'react'
import {storeFactory} from 'tocco-util'

export default store => props => {
  const EntityBrowser = require('./components/EntityBrowser').default

  const reducer = require('./modules').default
  const toastrReducer = require('react-redux-toastr').reducer

  const sagas = require('./modules/sagas').default

  storeFactory.injectReducers(store, {
    entityBrowser: reducer,
    toastr: toastrReducer
  })

  storeFactory.injectSaga(store, sagas)

  return <EntityBrowser {...props}/>
}
