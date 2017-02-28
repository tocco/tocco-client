import React from 'react'
import {storeFactory} from 'tocco-util'

export default store => props => {
  const ListViewContainer = require('./containers/ListViewContainer').default

  const reducer = require('./modules').default
  const searchFormReducer = require('./modules/searchForm').default

  const sagas = require('./modules/sagas').default
  const searchFormSagas = require('./modules/searchForm/sagas').default

  storeFactory.hotReloadReducers(store, {
    list: reducer,
    searchForm: searchFormReducer
  })

  storeFactory.injectSaga(sagas)
  storeFactory.injectSaga(searchFormSagas)

  return <ListViewContainer router={props}/>
}
