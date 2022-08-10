import sagas from './sagas'

export const addToStore = (store, configSelector = () => null) => {
  store.sagaMiddleware.run(sagas, configSelector)
}
