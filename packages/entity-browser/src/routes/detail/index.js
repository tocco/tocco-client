import React from 'react'
import {storeFactory} from 'tocco-util'

export default store => props => {
  const DetailViewContainer = require('./containers/DetailViewContainer').default

  const reducer = require('./modules').default
  const form = require('redux-form').reducer

  const sagas = require('./modules/sagas').default

  storeFactory.injectReducers(store, {
    detail: reducer,
    form
  })

  storeFactory.injectSaga(store, sagas)

  return <DetailViewContainer {...props}/>
}
