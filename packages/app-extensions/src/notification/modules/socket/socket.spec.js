import {notificationToToaster, TOASTER_KEY_PREFIX} from './socket'
import {TYPES} from '../../types'

describe('app-extensions', () => {
  describe('notification', () => {
    describe('modules', () => {
      describe('socket', () => {
        describe('notificationToToaster', () => {
          test('notificationToToaster', () => {
            const key = '1'
            const type = TYPES.info
            const timeString = ''
            const title = 'title'
            const message = 'msg'
            const notification = {
              key,
              type,
              time: timeString,
              title,
              message
            }
            const toaster = notificationToToaster(notification)
            expect(toaster.key).to.be.eql(`${TOASTER_KEY_PREFIX}${key}`)
            expect(toaster.type).to.be.eql(type)
            expect(toaster.time).to.be.eql(new Date(timeString))
            expect(toaster.title).to.be.eql(title)
            expect(toaster.message).to.be.eql(message)
          })
        })
      })
    })
  })
})
