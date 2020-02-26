import {actions as toastrActionsr} from 'react-redux-toastr'
import {expectSaga} from 'redux-saga-test-plan'
import {takeEvery, all, call, put} from 'redux-saga/effects'

import {getConfirmationAction, getYesNoAction, getBlockingInfo} from '../notificationActionFactory'
import rootSaga, * as sagas from './sagas'
import * as actions from './actions'
import actionEmitter from '../../actionEmitter'

const EMPTY_FUNC = () => {}

describe('app-extensions', () => {
  describe('notifier', () => {
    describe('sagas', () => {
      describe('root saga', () => {
        test('should handle notify and confirm', () => {
          const accept = true
          const generator = rootSaga(accept)

          expect(generator.next().value).to.deep.equal(
            all([
              takeEvery(actions.INFO, sagas.handleNotify),
              takeEvery(actions.CONFIRM, sagas.handleConfirm),
              takeEvery(actions.YES_NO_QUESTION, sagas.handleYesNoQuestion),
              takeEvery(actions.BLOCKING_INFO, sagas.handleBlockingInfo),
              takeEvery(actions.REMOVE_BLOCKING_INFO, sagas.removeBlockingInfo)
            ])
          )

          expect(generator.next().done).to.be.true
        })

        test('should emit notify and confirm', () => {
          const accept = false
          const generator = rootSaga(accept)

          expect(generator.next().value).to.deep.equal(
            all([
              takeEvery(actions.INFO, sagas.emit),
              takeEvery(actions.CONFIRM, sagas.emit),
              takeEvery(actions.YES_NO_QUESTION, sagas.emit),
              takeEvery(actions.BLOCKING_INFO, sagas.emit),
              takeEvery(actions.REMOVE_BLOCKING_INFO, sagas.emit),
              takeEvery(actions.MODAL_COMPONENT, sagas.emit),
              takeEvery(actions.REMOVE_MODAL_COMPONENT, sagas.emit)
            ])
          )

          expect(generator.next().done).to.be.true
        })
      })

      describe('handleNotify', () => {
        test('Should call remove after userActive is dispatched and timeout has passed', () => {
          const type = 'error'
          const title = 'title'
          const message = 'message'
          const icon = 'star'
          const timeOut = 300

          const infoAction = actions.info(type, title, message, icon, timeOut)

          return expectSaga(sagas.handleNotify, infoAction)
            .put.like({action: {type: '@ReduxToastr/toastr/ADD'}})
            .dispatch(actions.userActive())
            .put.like({action: {type: '@ReduxToastr/toastr/REMOVE'}})
            .run(1000)
        })
      })

      describe('handleNotify', () => {
        test('Should NOT call remove if timeOut is set', () => {
          const type = 'error'
          const title = 'title'
          const message = 'message'
          const icon = 'star'

          const infoAction = actions.info(type, title, message, icon)

          return expectSaga(sagas.handleNotify, infoAction)
            .put.like({action: {type: '@ReduxToastr/toastr/ADD'}})
            .not.put.like({action: {type: '@ReduxToastr/toastr/REMOVE'}})
            .run(1000)
        })
      })

      describe('handleNotify', () => {
        test('Should NOT call remove if no userActive is dispatched', () => {
          const type = 'error'
          const title = 'title'
          const message = 'message'
          const icon = 'star'
          const timeOut = 300

          const infoAction = actions.info(type, title, message, icon, timeOut)

          return expectSaga(sagas.handleNotify, infoAction)
            .put.like({action: {type: '@ReduxToastr/toastr/ADD'}})
            .not.put.like({action: {type: '@ReduxToastr/toastr/REMOVE'}})
            .run(1000)
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

          const confirmAction = actions.confirm(title, message, okText, cancelText, onOk, onCancel)

          const generator = sagas.handleConfirm(confirmAction)

          const resultAction = {TYPE: 'something'}

          expect(generator.next().value).to.deep.equal(
            call(getConfirmationAction, title, message, okText, cancelText, onOk, onCancel)
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
            title, message, yesText, noText, cancelText, onYes, onNo, onCancel
          )

          const generator = sagas.handleYesNoQuestion(questionAction)

          const resultAction = {TYPE: 'something'}

          expect(generator.next().value).to.deep.equal(
            call(getYesNoAction, title, message, yesText, noText, cancelText, onYes, onNo, onCancel)
          )
          expect(generator.next(resultAction).value).to.deep.equal(put(resultAction))

          expect(generator.next().done).to.be.true
        })
      })

      describe('handleBlockingInfo', () => {
        test('should handel handleBlockingInfo', () => {
          const id = Date.now()
          const title = 'ttl'
          const message = 'msg'

          const questionAction = actions.blockingInfo(id, title, message)

          const generator = sagas.handleBlockingInfo(questionAction)

          const resultAction = {TYPE: 'something'}

          expect(generator.next().value).to.deep.equal(
            call(getBlockingInfo, id, title, message)
          )
          expect(generator.next(resultAction).value).to.deep.equal(put(resultAction))

          expect(generator.next().done).to.be.true
        })
      })

      describe('removeBlockingInfo', () => {
        test('should handel removeBlockingInfo', () => {
          const id = Date.now()

          const action = actions.removeBlockingInfo(id)

          const generator = sagas.removeBlockingInfo(action)
          expect(generator.next().value).to.eql(put(toastrActionsr.remove(id)))
          expect(generator.next().done).to.be.true
        })
      })

      describe('emit', () => {
        test('should handel removeBlockingInfo', () => {
          const id = Date.now()

          const action = actions.removeBlockingInfo(id)

          const generator = sagas.emit(action)
          expect(generator.next().value).to.eql(put(actionEmitter.emitAction(action)))
          expect(generator.next().done).to.be.true
        })
      })
    })
  })
})
