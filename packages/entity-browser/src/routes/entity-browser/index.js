import React from 'react'
import {storeFactory} from 'tocco-util'
import {setEntityName, setFormBase} from './modules/actions'
import asyncRoute from '../../util/asyncRoute'
import {dispatchInput} from '../../util/input'

export default (store, input) => props => {
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

        dispatchInput(store, input, 'entityName', setEntityName, true)
        dispatchInput(store, input, 'entityName', setFormBase)
        dispatchInput(store, input, 'formBase', setFormBase)

        resolve(EntityBrowserContainer)
      })
    })
  )
  return <Component {...props}/>
}
