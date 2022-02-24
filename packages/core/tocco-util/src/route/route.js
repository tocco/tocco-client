import reducerUtil from '../reducer'
import sagaUtil from '../saga'
import asyncRoute from './asyncRoute'

const loadedComponents = {}

export const loadRoute = (store, importRouteDependencies, key) => props => {
  if (key && loadedComponents[key]) {
    const Component = loadedComponents[key]
    return <Component {...props} />
  }

  const Component = asyncRoute(
    () =>
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

          resolve(route.container)
        })
      })
  )

  if (key) {
    loadedComponents[key] = Component
  }

  return <Component {...props} />
}
