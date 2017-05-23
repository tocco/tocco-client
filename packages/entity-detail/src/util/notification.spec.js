import * as notification from './notification'

describe('entity-browser', () => {
  describe('util', () => {
    describe('notification', () => {
      describe('createNotificationAction', () => {
        it('should create a notify action with correct type and options', () => {
          const type = 'error'
          const glyphicon = 'heart'
          const timeOut = 200
          const action = notification.createNotificationAction(type, 'title', 'message', glyphicon, timeOut)

          const {payload} = action

          expect(payload.type).to.eql(type)

          expect(payload.options).to.have.property('icon')
          expect(payload.options).to.have.property('timeOut', timeOut)
          expect(payload.options.component()).to.be.instanceof(Object)
        })
      })

      describe('createConfirmationAction', () => {
        it('should create a confirm action with correct type and options', () => {
          const onOk = () => {}
          const onCancel = () => {}
          const action = notification.createConfirmationAction('message', 'ok', 'cancel', onOk, onCancel)

          const {payload} = action

          expect(payload.message).to.eql('message')

          expect(payload.options.okText).to.eql('ok')
          expect(payload.options.cancelText).to.eql('cancel')
          expect(payload.options.onOk).to.eql(onOk)
          expect(payload.options.onCancel).to.eql(onCancel)
        })
      })

      describe('notify', () => {
        it('should dispatch a notify action with correct type and options', () => {
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

      describe('confirm', () => {
        it('should dispatch a confirm action with correct type and options', () => {
          const onOk = () => {}
          const onCancel = () => {}
          const gen = notification.confirm('message', 'ok', 'cancel', onOk, onCancel)
          const putAction = gen.next().value
          expect(putAction).to.have.property('PUT')

          const payload = putAction.PUT.action.payload

          expect(payload.message).to.eql('message')

          expect(payload.options.okText).to.eql('ok')
          expect(payload.options.cancelText).to.eql('cancel')
          expect(payload.options.onOk).to.eql(onOk)
          expect(payload.options.onCancel).to.eql(onCancel)
        })
      })
    })
  })
})
