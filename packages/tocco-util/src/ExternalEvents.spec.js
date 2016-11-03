import events from './ExternalEvents'

describe('tocco-util', () => {
  describe('ExternalEvents', () => {
    it('should register event handlers', () => {
      events.registerEvents({success: () => {}})
      expect(events.getEvents()).to.deep.equal(['success'])
    })

    it('should invoke event handler', () => {
      const handler = sinon.spy()
      events.registerEvents({success: handler})
      events.invokeExternalEvent('success')
      expect(handler).to.have.property('callCount', 1)
    })

    it('should pass arguments to event handler', () => {
      const handler = sinon.spy()
      events.registerEvents({success: handler})
      events.invokeExternalEvent('success', 'arg1', 'arg2', 'arg3')
      expect(handler).to.have.been.calledWith('arg1', 'arg2', 'arg3')
    })

    it('should ignore unknown events', done => {
      events.invokeExternalEvent('unknown')
      done()
    })
  })
})
