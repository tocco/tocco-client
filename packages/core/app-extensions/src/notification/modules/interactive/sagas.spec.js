import {expectSaga} from 'redux-saga-test-plan'
import {takeEvery, all, call, put} from 'redux-saga/effects'

import actionEmitter from '../../../actionEmitter'
import * as actions from './actions'
import {getConfirmationAction, getYesNoAction} from './interactive'
import rootSaga, * as sagas from './sagas'

const EMPTY_FUNC = () => {}

describe('app-extensions', () => {
  describe('notification', () => {
    describe('modules', () => {
      describe('interactive', () => {
        describe('sagas', () => {
          describe('root saga', () => {
            test('should handle notify and confirm', () => {
              const accept = true
              const generator = rootSaga(accept)

              expect(generator.next().value).to.deep.equal(
                all([
                  takeEvery(actions.CONFIRM, sagas.handleConfirm),
                  takeEvery(actions.YES_NO_QUESTION, sagas.handleYesNoQuestion)
                ])
              )
              expect(generator.next().done).to.be.true
            })

            test('should emit notify and confirm', () => {
              const accept = false
              const generator = rootSaga(accept)

              expect(generator.next().value).to.deep.equal(
                all([takeEvery(actions.CONFIRM, sagas.emit), takeEvery(actions.YES_NO_QUESTION, sagas.emit)])
              )

              expect(generator.next().done).to.be.true
            })
          })

          describe('handleConfirm', () => {
            test('should handel confirm', () => {
              const title = 'ttl'
              const message = 'msg'
              const okText = 'ok'
              const cancelText = 'cancel'
              const onOk = EMPTY_FUNC
              const onCancel = EMPTY_FUNC
              const defaultAction = 'cancel'

              const confirmAction = actions.confirm(title, message, okText, cancelText, onOk, onCancel, defaultAction)

              const generator = sagas.handleConfirm(confirmAction)

              const resultAction = {TYPE: 'something'}

              expect(generator.next().value).to.deep.equal(
                call(getConfirmationAction, {title, message, okText, cancelText, onOk, onCancel, defaultAction})
              )
              expect(generator.next(resultAction).value).to.deep.equal(put(resultAction))

              expect(generator.next().done).to.be.true
            })
          })

          describe('handleYesNoQuestion', () => {
            test('should handel yesNoQuestion', () => {
              const title = 'ttl'
              const message = 'msg'
              const yesText = 'ok'
              const noText = 'ok'
              const cancelText = 'cancel'
              const onYes = EMPTY_FUNC
              const onNo = EMPTY_FUNC
              const onCancel = EMPTY_FUNC

              const questionAction = actions.yesNoQuestion(
                title,
                message,
                yesText,
                noText,
                cancelText,
                onYes,
                onNo,
                onCancel
              )

              const generator = sagas.handleYesNoQuestion(questionAction)

              const resultAction = {TYPE: 'something'}

              expect(generator.next().value).to.deep.equal(
                call(getYesNoAction, {title, message, yesText, noText, cancelText, onYes, onNo, onCancel})
              )
              expect(generator.next(resultAction).value).to.deep.equal(put(resultAction))

              expect(generator.next().done).to.be.true
            })
          })

          describe('emit', () => {
            test('should handel removeBlockingInfo', () => {
              const action = actions.confirm('title', 'message')

              return expectSaga(sagas.emit, action).put(actionEmitter.emitAction(action)).run()
            })
          })
        })
      })
    })
  })
})
