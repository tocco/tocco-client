
import {getConfirmationAction, getYesNoAction} from './interactive'

const EMPTY_FUNC = () => { }

describe('app-extensions', () => {
  describe('notification', () => {
    describe('modules', () => {
      describe('interactive', () => {
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

          test('should return an action', () => {
            const action = getYesNoAction('title', 'message', 'yes', 'no', 'cancel', EMPTY_FUNC, EMPTY_FUNC, EMPTY_FUNC)
            expect(action).to.have.property('type')
          })
        })
      })
    })
  })
})
