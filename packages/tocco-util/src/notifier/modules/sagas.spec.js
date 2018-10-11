import {actions as toastrActionsr} from 'react-redux-toastr'

import {getConfirmationAction, getInfoAction, getYesNoAction, getBlockingInfo} from '../notificationActionFactory'
import rootSaga, * as sagas from './sagas'
import * as actions from './actions'
import actionEmitter from '../../actionEmitter'

import {fork, takeEvery, all, call, put} from 'redux-saga/effects'

const EMPTY_FUNC = () => {}

describe('tocco-util', () => {
  describe('notifier', () => {
    describe('sagas', () => {
      describe('root saga', () => {
        test('should handle notify and confirm', () => {
          const accept = true
          const generator = rootSaga(accept)

          expect(generator.next().value).to.deep.equal(
            all([
              fork(takeEvery, actions.INFO, sagas.handleNotify),
              fork(takeEvery, actions.CONFIRM, sagas.handleConfirm),
              fork(takeEvery, actions.YES_NO_QUESTION, sagas.handleYesNoQuestion),
              fork(takeEvery, actions.BLOCKING_INFO, sagas.handleBlockingInfo),
              fork(takeEvery, actions.REMOVE_BLOCKING_INFO, sagas.removeBlockingInfo)
            ])
          )

          expect(generator.next().done).to.be.true
        })

        test('should emit notify and confirm', () => {
          const accept = false
          const generator = rootSaga(accept)

          expect(generator.next().value).to.deep.equal(
            all([
              fork(takeEvery, actions.INFO, sagas.emit),
              fork(takeEvery, actions.CONFIRM, sagas.emit),
              fork(takeEvery, actions.YES_NO_QUESTION, sagas.emit),
              fork(takeEvery, actions.BLOCKING_INFO, sagas.emit),
              fork(takeEvery, actions.REMOVE_BLOCKING_INFO, sagas.emit),
              fork(takeEvery, actions.MODAL_COMPONENT, sagas.emit),
              fork(takeEvery, actions.REMOVE_MODAL_COMPONENT, sagas.emit)
            ])
          )

          expect(generator.next().done).to.be.true
        })
      })

      describe('handleNotify', () => {
        test('should handel notify', () => {
          const type = 'error'
          const title = 'title'
          const message = 'message'
          const icon = 'star'
          const timeOut = 1000
          const infoAction = actions.info(type, title, message, icon, timeOut)

          const generator = sagas.handleNotify(infoAction)

          const resultAction = {TYPE: 'something'}

          expect(generator.next().value).to.deep.equal(call(getInfoAction, type, title, message, icon, timeOut))
          expect(generator.next(resultAction).value).to.deep.equal(put(resultAction))

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
