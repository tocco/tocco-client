import React from 'react'

import reducerUtil from '../reducer'
import sagaUtil from '../saga'
import asyncRoute from './asyncRoute'
import {dispatchInput} from './input'

const loadedComponents = {}

export const loadRoute = (store, input, importRouteDependencies, key) => props => {
  if (key && loadedComponents[key]) {
    const Component = loadedComponents[key]
    return <Component {...props}/>
  }

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

  if (key) {
    loadedComponents[key] = Component
  }

  return <Component {...props}/>
}
