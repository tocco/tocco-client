import userEvent from '@testing-library/user-event'
import {testingLibrary} from 'tocco-test-util'

import {getConfirmationAction, getYesNoAction} from './interactive'

const EMPTY_FUNC = () => {}

describe('app-extensions', () => {
  describe('notification', () => {
    describe('modules', () => {
      describe('interactive', () => {
        describe('getConfirmationAction', () => {
          test('should return an action', () => {
            const action = getConfirmationAction({
              message: 'Message?',
              okText: 'ok',
              cancelText: 'cancel',
              onOk: EMPTY_FUNC,
              onCancel: EMPTY_FUNC
            })
            expect(action).to.have.property('type')
          })

          test('should default to ok button', async () => {
            const onOk = sinon.spy()
            const onCancel = sinon.spy()
            const action = getConfirmationAction({
              message: 'Message?',
              okText: 'ok',
              cancelText: 'cancel',
              onOk,
              onCancel
            })
            const user = userEvent.setup()
            testingLibrary.renderWithIntl(<action.payload.component close={EMPTY_FUNC} />)
            await user.keyboard('[Enter]')
            expect(onOk).to.have.been.calledOnce
            expect(onCancel).to.not.have.been.called
          })

          test('should set default button', async () => {
            const onOk = sinon.spy()
            const onCancel = sinon.spy()
            const action = getConfirmationAction({
              message: 'Message?',
              okText: 'ok',
              cancelText: 'cancel',
              onOk,
              onCancel,
              defaultAction: 'cancel'
            })
            const user = userEvent.setup()
            testingLibrary.renderWithIntl(<action.payload.component close={EMPTY_FUNC} />)
            await user.keyboard('[Enter]')
            expect(onOk).to.not.have.been.called
            expect(onCancel).to.have.been.calledOnce
          })
        })

        describe('getYesNoAction', () => {
          test('should return an action', () => {
            const action = getYesNoAction({
              message: 'Message?',
              okText: 'ok',
              cancelText: 'cancel',
              onOk: EMPTY_FUNC,
              onCancel: EMPTY_FUNC
            })
            expect(action).to.have.property('type')
          })

          test('should return an action', () => {
            const action = getYesNoAction({
              title: 'title',
              message: 'Message?',
              okText: 'ok',
              cancelText: 'cancel',
              onOk: EMPTY_FUNC,
              onCancel: EMPTY_FUNC
            })
            expect(action).to.have.property('type')
          })
        })
      })
    })
  })
})
