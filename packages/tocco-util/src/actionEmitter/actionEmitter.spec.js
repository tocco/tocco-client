import {addToStore} from './actionEmitter'

describe('tocco-util', () => {
  describe('actionEmitter', () => {
    describe('actionEmitter', () => {
      describe('addToStore', () => {
        test('should start sagas', () => {
          const sagaRunSpy = sinon.spy()
          const store = {
            sagaMiddleware: {
              run: sagaRunSpy
            }
          }

          addToStore(store, () => {})

          expect(sagaRunSpy).to.be.calledOnce
        })
      })
    })
  })
})
