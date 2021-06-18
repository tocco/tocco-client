import {DEFAULT_DURATION, enhanceToaster} from './toaster'
import {TYPES} from '../../types'

describe('app-extensions', () => {
  describe('notification', () => {
    describe('modules', () => {
      describe('toaster', () => {
        describe('toaster', () => {
          describe('enhanceToaster', () => {
            const key = 'key-1'
            const title = 'title'
            const body = 'body'
            const icon = 'times-circle'
            const onClose = () => {
            }
            const duration = 1
            const time = new Date()

            test('no title and body', () => {
              const toaster = {}
              expect(enhanceToaster(toaster)).to.be.null
            })

            test('everything defined', () => {
              const toaster = {title, body, type: 'info', key, icon, onClose, duration, time}
              const enhancedToaster = {type: TYPES.info, key, title, body, icon, onClose, duration, time}
              expect(enhanceToaster(toaster)).to.be.eql(enhancedToaster)
            })

            test('not everything defined (body, icon, onClose and duration not set)', () => {
              const toaster = {title, key, time}
              const enhancedToaster = {type: TYPES.neutral, key, title, icon: null, duration: DEFAULT_DURATION, time}
              expect(enhanceToaster(toaster)).to.be.eql(enhancedToaster)
            })

            test('no title', () => {
              const toaster = {body}
              expect(enhanceToaster(toaster).title).to.be.undefined
            })

            test('no body', () => {
              const toaster = {title}
              expect(enhanceToaster(toaster).body).to.be.undefined
            })

            test('no type defined, neutral as fallback', () => {
              const toaster = {title}
              const enhancedToaster = enhanceToaster(toaster)
              expect(enhancedToaster.type).to.be.eql(TYPES.neutral)
              expect(enhancedToaster.icon).to.be.null
            })

            test('no type defined but an icon', () => {
              const toaster = {title, icon}
              const enhancedToaster = enhanceToaster(toaster)
              expect(enhancedToaster.type).to.be.eql(TYPES.neutral)
              expect(enhancedToaster.icon).to.be.eql(icon)
            })

            test('illegal type passed, neutral as fallback', () => {
              const toaster = {title, type: 'illegal'}
              const enhancedToaster = enhanceToaster(toaster)
              expect(enhancedToaster.type).to.be.eql(TYPES.neutral)
              expect(enhancedToaster.icon).to.be.null
            })

            test('override icon of type', () => {
              const toaster = {title, type: 'info', icon}
              const enhancedToaster = enhanceToaster(toaster)
              expect(enhancedToaster.type).to.be.eql(TYPES.info)
              expect(enhancedToaster.icon).to.be.eql(icon)
            })

            test('not duration defined, default duration', () => {
              const toaster = {title, type: 'info', body, key, icon, time}
              expect(enhanceToaster(toaster).duration).to.be.eql(DEFAULT_DURATION)
            })

            test('duration is -1 if type is error', () => {
              const toaster = {title, type: 'error', body, key, icon, time}
              expect(enhanceToaster(toaster).duration).to.be.eql(-1)
            })

            test('duration is -1 if type is warning', () => {
              const toaster = {title, type: 'warning', body, key, icon, time}
              expect(enhanceToaster(toaster).duration).to.be.eql(-1)
            })
          })
        })
      })
    })
  })
})
