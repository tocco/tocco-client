import {registerEvents, getEvents, invokeExternalEvent} from './externalEvents'

describe('tocco-util', () => {
  describe('ExternalEvents', () => {
    it('should register event handlers', () => {
      registerEvents({success: () => {}})
      expect(getEvents()).to.deep.equal(['success'])
    })

    it('should invoke event handler', () => {
      const handler = sinon.spy()
      registerEvents({success: handler})
      invokeExternalEvent('success')
      expect(handler).to.have.property('callCount', 1)
    })

    it('should pass arguments to event handler', () => {
      const handler = sinon.spy()
      registerEvents({success: handler})
      invokeExternalEvent('success', 'arg1', 'arg2', 'arg3')
      expect(handler).to.have.been.calledWith('arg1', 'arg2', 'arg3')
    })

    it('should ignore unknown events', done => {
      invokeExternalEvent('unknown')
      done()
    })
  })
})
