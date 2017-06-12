import * as externalEvents from './externalEvents'

describe('tocco-util', () => {
  describe('externalEvents', () => {
    describe('invokeExternalEvent', () => {
      it('should invoke event handler', () => {
        const handler = sinon.spy()
        const events = {success: handler}
        externalEvents.invokeExternalEvent(events, 'success')
        expect(handler).to.have.property('callCount', 1)
      })

      it('should pass arguments to event handler', () => {
        const handler = sinon.spy()
        const events = {success: handler}
        externalEvents.invokeExternalEvent(events, 'success', 'arg1', 'arg2', 'arg3')
        expect(handler).to.have.been.calledWith('arg1', 'arg2', 'arg3')
      })

      it('should ignore unknown events', done => {
        externalEvents.invokeExternalEvent('unknown')
        done()
      })
    })

    describe('addToStore', () => {
      it('should start sagas', () => {
        const sagaRunSpy = sinon.spy()
        const store = {
          sagaMiddleware: {
            run: sagaRunSpy
          }
        }

        externalEvents.addToStore(store, () => {})

        expect(sagaRunSpy).to.be.calledOnce
      })
    })
  })
})
