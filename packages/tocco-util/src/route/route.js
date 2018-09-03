import React from 'react'

import appFactory from '../appFactory'
import asyncRoute from './asyncRoute'
import {dispatchInput} from './input'

export const loadRoute = (store, input, importRouteDependencies, path) => props => {
  const Component = asyncRoute(() =>
    new Promise(resolve => {
      importRouteDependencies().then(imported => {
        const route = imported.default

        if (route.reducers) {
          appFactory.injectReducers(store, route.reducers)
        }

        if (route.sagas) {
          route.sagas.forEach(saga => {
            appFactory.injectSaga(store, saga)
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
