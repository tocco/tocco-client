import React from 'react'
import storeFactory from '../storeFactory'
import asyncRoute from './asyncRoute'
import {dispatchInput} from './input'

export const loadRoute = (store, input, importRouteDependencies, path) => props => {
  const Component = asyncRoute(() =>
    new Promise(resolve => {
      importRouteDependencies().then(module => {
        storeFactory.injectReducers(store, module.default.reducer)

        module.default.sagas.forEach(saga => {
          storeFactory.injectSaga(store, saga)
        })

        if (module.default.inputDispatches) {
          module.default.inputDispatches.forEach(inputDispatch => {
            dispatchInput(store, input, inputDispatch.field, inputDispatch.action, inputDispatch.mandatory)
          })
        }

        resolve(module.default.container)
      })
    })
  )

  return <Component {...props}/>
}

