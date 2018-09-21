import {getInfoAction, getConfirmationAction, getYesNoAction, getBlockingInfo} from './notificationActionFactory'

const EMPTY_FUNC = () => {}

describe('tocco-util', () => {
  describe('notifier', () => {
    describe('getInfoAction', () => {
      test('should return an action', () => {
        const action = getInfoAction('info', 'title', 'message', 'star', 1000)
        expect(action).to.have.property('type')
      })
    })

    describe('getConfirmationAction', () => {
      test('should return an action', () => {
        const action = getConfirmationAction('Message?', 'ok', 'cancel', EMPTY_FUNC, EMPTY_FUNC)
        expect(action).to.have.property('type')
      })
    })

    describe('getYesNoAction', () => {
      test('should return an action', () => {
        const action = getYesNoAction('Message?', 'ok', 'cancel', EMPTY_FUNC, EMPTY_FUNC)
        expect(action).to.have.property('type')
      })
    })

    describe('getYesNoAction', () => {
      test('should return an action', () => {
        const action = getYesNoAction('title', 'message', 'yes', 'no', 'cancel', EMPTY_FUNC, EMPTY_FUNC, EMPTY_FUNC)
        expect(action).to.have.property('type')
      })
    })

    describe('getYesNoAction', () => {
      test('should return an action', () => {
        const action = getBlockingInfo('id', 'title', 'message', 'heart')
        expect(action).to.have.property('type')
      })
    })
  })
})
