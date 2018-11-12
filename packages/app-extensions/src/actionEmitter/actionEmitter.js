import sagas from './sagas'

export const addToStore = (store, parentEmitAction) => {
  store.sagaMiddleware.run(sagas, parentEmitAction)
}
