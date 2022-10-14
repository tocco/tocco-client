import {env} from 'tocco-util'

import {TYPES} from '../../types'
import {hasOutputjobInWidget, notificationToToaster, TOASTER_KEY_PREFIX} from './socket'

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

        describe('hasOutputjobInWidget', () => {
          const notificationWithoutResult = {}
          const notificationWithEnityResult = {
            result: {
              type: 'ENTITIES'
            }
          }
          const notificationWithOutputjob = {
            result: {
              type: 'OUTPUTJOB'
            }
          }

          test('has output job but embed type is admin', () => {
            env.setEmbedType('admin')
            expect(hasOutputjobInWidget(notificationWithOutputjob)).to.be.eql(false)
          })

          test('has output job and embed type is widget', () => {
            env.setEmbedType('widget')
            expect(hasOutputjobInWidget(notificationWithOutputjob)).to.be.eql(true)
          })

          test('has entity result and embed type is widget', () => {
            env.setEmbedType('widget')
            expect(hasOutputjobInWidget(notificationWithEnityResult)).to.be.eql(false)
          })

          test('without result and embed type is widget', () => {
            env.setEmbedType('widget')
            expect(hasOutputjobInWidget(notificationWithoutResult)).to.be.eql(false)
          })
        })
      })
    })
  })
})
