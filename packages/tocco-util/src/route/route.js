import React from 'react'

import reducerUtil from '../reducer'
import sagaUtil from '../saga'
import asyncRoute from './asyncRoute'
import {dispatchInput} from './input'

export const loadRoute = (store, input, importRouteDependencies) => props => {
  const Component = asyncRoute(() =>
    new Promise(resolve => {
      importRouteDependencies().then(imported => {
        const route = imported.default

        if (route.reducers) {
          reducerUtil.injectReducers(store, route.reducers)
        }

        if (route.sagas) {
          route.sagas.forEach(saga => {
            sagaUtil.injectSaga(store, saga)
          })
        }

        if (route.inputDispatches) {
          route.inputDispatches.forEach(inputDispatch => {
            dispatchInput(
              store,
              input,
              inputDispatch
            )
          })
        }

        resolve(route.container)
      })
    })
  )

  return <Component {...props}/>
}
