import * as externalEvents from './externalEvents'

describe('tocco-util', () => {
  describe('externalEvents', () => {
    describe('invokeExternalEvent', () => {
      test('should invoke event handler', () => {
        const handler = sinon.spy()
        const events = {success: handler}
        externalEvents.invokeExternalEvent(events, 'success')
        expect(handler).to.have.property('callCount', 1)
      })

      test('should pass arguments to event handler', () => {
        const handler = sinon.spy()
        const events = {success: handler}
        externalEvents.invokeExternalEvent(events, 'success', 'arg1', 'arg2', 'arg3')
        expect(handler).to.have.been.calledWith('arg1', 'arg2', 'arg3')
      })

      test('should ignore unknown events', done => {
        externalEvents.invokeExternalEvent('unknown')
        done()
      })
    })

    describe('addToStore', () => {
      test('should start sagas', () => {
        const sagaRunSpy = sinon.spy()
        const store = {
          sagaMiddleware: {
            run: sagaRunSpy
          }
        }

        externalEvents.addToStore(store, {})

        expect(sagaRunSpy).to.be.calledOnce
      })
    })
  })
})
