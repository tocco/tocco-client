import {createStore} from 'redux'

import {addToStore} from './notifier'

describe('app-extensions', () => {
  describe('notifier', () => {
    describe('notifier', () => {
      describe('addToStore', () => {
        test('should start sagas and reducer if accept', () => {
          const sagaRunSpy = sinon.spy()
          const store = createStore(() => {
          })

          store.allReducers = {}
          store.sagaMiddleware = {
            run: sagaRunSpy
          }

          const accept = true
          addToStore(store, accept)

          expect(sagaRunSpy).to.be.calledOnce
          expect(store.allReducers).to.have.property('toastr')
        })
      })

      test('should start sagas and reducer if accept', () => {
        const sagaRunSpy = sinon.spy()
        const store = createStore(() => {
        })

        store.allReducers = {}
        store.sagaMiddleware = {
          run: sagaRunSpy
        }

        const accept = false
        addToStore(store, accept)

        expect(sagaRunSpy).to.be.calledOnce
        expect(store.allReducers).to.not.have.property('toastr')
      })
    })
  })
})
