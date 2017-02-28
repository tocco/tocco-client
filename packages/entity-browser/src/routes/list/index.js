import React from 'react'
import {storeFactory} from 'tocco-util'

export default store => props => {
  const ListViewContainer = require('./containers/ListViewContainer').default
  const reducer = require('./modules').default
  const sagas = require('./modules/sagas').default

  storeFactory.hotReloadReducers(store, {
    list: reducer
  })

  storeFactory.injectSaga(sagas)

  return <ListViewContainer router={props}/>
}
