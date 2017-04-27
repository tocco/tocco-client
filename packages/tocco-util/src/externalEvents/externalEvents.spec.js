import * as externalEvents from './externalEvents'
import {call} from 'redux-saga/effects'

describe('tocco-util', () => {
  describe('externalEvents', () => {
    describe('fireExternalEvent', () => {
      it('should create a FIRE_EXTERNAL_EVENT action', () => {
        const eventName = 'success'
        const payload = {
          prop1: 'value1',
          prop2: 'value2'
        }

        const action = externalEvents.fireExternalEvent(eventName, payload)

        expect(action).to.deep.equal({
          type: externalEvents.FIRE_EXTERNAL_EVENT,
          payload: {
            name: eventName,
            payload
          }
        })
      })
    })

    describe('registerEvents', () => {
      it('should register event handlers', () => {
        externalEvents.registerEvents({success: () => {}})
        expect(externalEvents.getEvents()).to.deep.equal(['success'])
      })
    })

    describe('invokeExternalEvent', () => {
      it('should invoke event handler', () => {
        const handler = sinon.spy()
        externalEvents.registerEvents({success: handler})
        externalEvents.invokeExternalEvent('success')
        expect(handler).to.have.property('callCount', 1)
      })

      it('should pass arguments to event handler', () => {
        const handler = sinon.spy()
        externalEvents.registerEvents({success: handler})
        externalEvents.invokeExternalEvent('success', 'arg1', 'arg2', 'arg3')
        expect(handler).to.have.been.calledWith('arg1', 'arg2', 'arg3')
      })

      it('should ignore unknown events', done => {
        externalEvents.invokeExternalEvent('unknown')
        done()
      })
    })

    describe('fireExternalEventSaga', () => {
      it('should call invokeExternalEvent', () => {
        const eventName = 'success'
        const payload = {
          prop1: 'value1',
          prop2: 'value2'
        }
        const action = externalEvents.fireExternalEvent(eventName, payload)
        const generator = externalEvents.fireExternalEventSaga(action)
        expect(generator.next().value).to.deep.equal(call(externalEvents.invokeExternalEvent, eventName, payload))
        expect(generator.next().done).to.equal(true)
      })
    })
  })
})
