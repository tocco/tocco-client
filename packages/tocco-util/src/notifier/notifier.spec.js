import {addToStore} from './notifier'
import {createStore} from 'redux'

describe('tocco-util', () => {
  describe('notifier', () => {
    describe('notifier', () => {
      describe('addToStore', () => {
        it('should start sagas and reducer if accept', () => {
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

      it('should start sagas and reducer if accept', () => {
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
