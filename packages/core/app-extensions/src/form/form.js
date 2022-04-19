import sagas from './sagas'

export const addToStore = (store, config) => {
  store.sagaMiddleware.run(sagas, config)
}
