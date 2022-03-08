import sagas from './sagas'

export const addToStore = store => {
  store.sagaMiddleware.run(sagas)
}
