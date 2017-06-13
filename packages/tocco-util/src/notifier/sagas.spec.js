import {fork, takeEvery, all, call, put} from 'redux-saga/effects'
import {getConfirmationAction, getInfoAction} from './notifier'
import rootSaga, * as sagas from './sagas'
import * as actions from './actions'

describe('tocco-util', () => {
  describe('notifier', () => {
    describe('sagas', () => {
      describe('root saga', () => {
        it('should handlen notify and confirm', () => {
          const accept = true
          const generator = rootSaga(accept)

          expect(generator.next().value).to.deep.equal(
            all([
              fork(takeEvery, actions.INFO, sagas.handleNotify),
              fork(takeEvery, actions.CONFIRM, sagas.handleConfirm)
            ])
          )

          expect(generator.next().done).to.be.true
        })

        it('should emit notify and confirm', () => {
          const accept = false
          const generator = rootSaga(accept)

          expect(generator.next().value).to.deep.equal(
            all([
              fork(takeEvery, actions.INFO, sagas.emit),
              fork(takeEvery, actions.CONFIRM, sagas.emit)
            ])
          )

          expect(generator.next().done).to.be.true
        })
      })

      describe('handleNotify', () => {
        it('should handel notify and confirm', () => {
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

      describe('handleNotify', () => {
        it('should handel notify and confirm', () => {
          const message = 'msg'
          const okText = 'ok'
          const cancelText = 'cancel'
          const onOk = () => {}
          const onCancel = () => {}

          const confirmAction = actions.confirm(message, okText, cancelText, onOk, onCancel)

          const generator = sagas.handleConfirm(confirmAction)

          const resultAction = {TYPE: 'something'}

          expect(generator.next().value).to.deep.equal(
            call(getConfirmationAction, message, okText, cancelText, onOk, onCancel)
          )
          expect(generator.next(resultAction).value).to.deep.equal(put(resultAction))

          expect(generator.next().done).to.be.true
        })
      })
    })
  })
})
