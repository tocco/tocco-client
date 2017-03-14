import * as notification from './notification'

describe('entity-browser', () => {
  describe('util', () => {
    describe('notification', () => {
      it('should dispatch a put with correct type and options', () => {
        const type = 'error'
        const glyphicon = 'heart'
        const timeOut = 200
        const gen = notification.notify(type, 'title', 'message', glyphicon, timeOut)
        const putAction = gen.next().value
        expect(putAction).to.have.property('PUT')

        const payload = putAction.PUT.action.payload
        expect(payload.type).to.eql(type)

        expect(payload.options).to.have.property('icon')
        expect(payload.options).to.have.property('timeOut', timeOut)
        expect(payload.options.component()).to.be.instanceof(Object)
      })
    })
  })
})
