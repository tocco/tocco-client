import {isAction} from './actions'

describe('tocco-util', () => {
  describe('actions', () => {
    describe('actions', () => {
      describe('isAction', () => {
        it('should return true only for actions', () => {
          const actionComponentType1 = 'action'
          const actionComponentType2 = 'action-group'
          const noneActionComponentType = 'field'

          expect(isAction(actionComponentType1)).to.be.true
          expect(isAction(actionComponentType2)).to.be.true
          expect(isAction(noneActionComponentType)).to.be.false
          expect(isAction('')).to.be.false
          expect(isAction(null)).to.be.false
          expect(isAction(undefined)).to.be.false
        })
      })

      describe('addToStore', () => {
        it('should start sagas and reducer if accept', () => {
          const sagaRunSpy = sinon.spy()
          const store = createStore(() => {})

          store.allReducers = {}
          store.sagaMiddleware = {
            run: sagaRunSpy
          }

          const accept = true
          addToStore(store, accept)

          expect(sagaRunSpy).to.be.calledOnce
          expect(store.allReducers).to.have.property('actions')
        })
      })
    })
  })
})
