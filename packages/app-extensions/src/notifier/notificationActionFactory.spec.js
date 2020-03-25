import {LoadingSpinner} from 'tocco-ui'

import {getInfoAction, getConfirmationAction, getYesNoAction, getBlockingInfo} from './notificationActionFactory'

const EMPTY_FUNC = () => {}

describe('app-extensions', () => {
  describe('notifier', () => {
    describe('getInfoAction', () => {
      test('should return an action', () => {
        const action = getInfoAction('info', 'title', 'message', null, 1000)
        expect(action).to.have.property('type')
      })

      test('should display close button but do not timeout', () => {
        const actions = [
          () => getInfoAction('info', 'title', 'message', null, 0),
          () => getInfoAction('success', 'title', 'message', null, 0),
          () => getInfoAction('warning', 'title', 'message', null, 0),
          () => getInfoAction('warning', 'title', 'message', null, 1),
          () => getInfoAction('warning', 'title', 'message'),
          () => getInfoAction('warning', 'title', 'message', null, null),
          () => getInfoAction('error', 'title', 'message', null, 0),
          () => getInfoAction('error', 'title', 'message', null, 1),
          () => getInfoAction('error', 'title', 'message'),
          () => getInfoAction('error', 'title', 'message', null, null)
        ]
        actions.map(test => {
          const action = test()
          expect(action.payload.options.removeOnHover).to.be.false
          expect(action.payload.options).to.have.property('removeOnHoverTimeOut', 0)
          expect(action.payload.options.showCloseButton).to.be.true
          expect(action.payload.options).to.have.property('timeOut', 0)
        })

        const actions2 = [
          () => getInfoAction('info', 'title', 'message'),
          () => getInfoAction('success', 'title', 'message')
        ]
        actions2.map(test => {
          const action = test()
          expect(action.payload.options.removeOnHover).to.be.false
          expect(action.payload.options.removeOnHoverTimeOut).to.be.undefined
          expect(action.payload.options.showCloseButton).to.be.true
          expect(action.payload.options.timeOut).to.be.undefined
        })

        const actions3 = [
          () => getInfoAction('info', 'title', 'message', null, null),
          () => getInfoAction('success', 'title', 'message', null, null)
        ]
        actions3.map(test => {
          const action = test()
          expect(action.payload.options.removeOnHover).to.be.false
          expect(action.payload.options.removeOnHoverTimeOut).to.be.null
          expect(action.payload.options.showCloseButton).to.be.true
          expect(action.payload.options.timeOut).to.be.null
        })
      })

      test('should hide close button but timeout', () => {
        const actions = [
          () => getInfoAction('info', 'title', 'message', null, 1),
          () => getInfoAction('success', 'title', 'message', null, 1)
        ]
        actions.map(test => {
          const action = test()
          expect(action.payload.options.removeOnHover).to.be.true
          expect(action.payload.options.removeOnHoverTimeOut).to.equal(1)
          expect(action.payload.options.showCloseButton).to.be.false
          expect(action.payload.options.timeOut).to.equal(1)
        })
      })

      test('should display default icon', () => {
        let action
        action = getInfoAction('info', 'title', 'message')
        expect(action.payload.options.icon.props.icon).to.equal('info')
        action = getInfoAction('success', 'title', 'message')
        expect(action.payload.options.icon.props.icon).to.equal('check')
        action = getInfoAction('warning', 'title', 'message')
        expect(action.payload.options.icon.props.icon).to.equal('exclamation')
        action = getInfoAction('error', 'title', 'message')
        expect(action.payload.options.icon.props.icon).to.equal('times')
      })

      test('should replace default icon', () => {
        const actions = [
          () => getInfoAction('info', 'title', 'message', 'thumbs-up'),
          () => getInfoAction('success', 'title', 'message', 'thumbs-up'),
          () => getInfoAction('warning', 'title', 'message', 'thumbs-up'),
          () => getInfoAction('error', 'title', 'message', 'thumbs-up')
        ]
        actions.map(test => {
          const action = test()
          expect(action.payload.options.icon.props.icon).to.equal('thumbs-up')
        })
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

      test('should return an action', () => {
        const action = getYesNoAction('title', 'message', 'yes', 'no', 'cancel', EMPTY_FUNC, EMPTY_FUNC, EMPTY_FUNC)
        expect(action).to.have.property('type')
      })

      test('should return an action', () => {
        const action = getBlockingInfo('id', 'title', 'message')
        expect(action).to.have.property('type')
      })
    })

    describe('getBlockingInfo', () => {
      test('should return an action', () => {
        const action = getBlockingInfo('id', 'title', 'message')
        expect(action).to.have.property('type')
      })

      test('should display default icon', () => {
        const action = getBlockingInfo('id', 'title', 'message')
        expect(action.payload.options.icon.type).to.equal(LoadingSpinner)
      })
    })
  })
})
