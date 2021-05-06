import {getSocketUrl, notificationToToaster, TOASTER_KEY_PREFIX} from './socket'
import {TYPES} from '../../types'

describe('app-extensions', () => {
  describe('notification', () => {
    describe('modules', () => {
      describe('socket', () => {
        describe('getSocketUrl', () => {
          test('getSocketUrl', () => {
            expect(getSocketUrl()).to.be.eql(`${__BACKEND_URL__}/nice2/websocket/notification`)
          })
        })

        describe('notificationToToaster', () => {
          test('notificationToToaster', () => {
            const key = '1'
            const type = TYPES.info
            const timeString = ''
            const message = 'msg'
            const notification = {
              key,
              type,
              time: timeString,
              message
            }
            const toaster = notificationToToaster(notification)
            expect(toaster.key).to.be.eql(`${TOASTER_KEY_PREFIX}${key}`)
            expect(toaster.type).to.be.eql(type)
            expect(toaster.time).to.be.eql(new Date(timeString))
            expect(toaster.title).to.be.eql(message)
          })
        })
      })
    })
  })
})
