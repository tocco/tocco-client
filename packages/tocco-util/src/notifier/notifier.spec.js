import {addToStore, getInfoAction, getConfirmationAction} from './notifier'
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
    describe('getToastrNotifyAction', () => {
      it('should return an action', () => {
        const action = getInfoAction('info', 'title', 'message', 'star', 1000)
        expect(action).to.have.property('type')
      })
    })
    describe('getConfirmationAction', () => {
      it('should return an action', () => {
        const action = getConfirmationAction('Message?', 'ok', 'cancel', () => {}, () => {})
        expect(action).to.have.property('type')
      })
    })
  })
})
