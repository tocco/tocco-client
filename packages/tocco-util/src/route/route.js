import React from 'react'
import storeFactory from '../storeFactory'
import asyncRoute from './asyncRoute'
import {dispatchInput} from './input'

export const loadRoute = (store, input, importRouteDependencies, path) => props => {
  const Component = asyncRoute(() =>
    new Promise(resolve => {
      importRouteDependencies().then(imported => {
        const route = imported.default
        storeFactory.injectReducers(store, route.reducers)

        route.sagas.forEach(saga => {
          storeFactory.injectSaga(store, saga)
        })

        if (route.inputDispatches) {
          route.inputDispatches.forEach(inputDispatch => {
            dispatchInput(store, input, inputDispatch.field, inputDispatch.action, inputDispatch.mandatory)
          })
        }

        resolve(route.container)
      })
    })
  )

  return <Component {...props}/>
}

