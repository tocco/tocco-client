import {testSaga} from 'redux-saga-test-plan'
import {actions as formActions} from 'redux-form'
import {call, fork, put, takeEvery} from 'redux-saga/effects'

import {documentToFormValueTransformer, uploadRequest} from './documents'
import * as actions from './actions'
import * as sagas from './sagas'

describe('app-extensions', () => {
  describe('formData', () => {
    describe('upload', () => {
      describe('sagas', () => {
        describe('main saga', () => {
          test('should fork sagas', () => {
            const saga = testSaga(sagas.default)
            saga.next().all([
              fork(takeEvery, actions.UPLOAD_DOCUMENT, sagas.uploadDocument)
            ])
          })
        })

        describe('uploadDocument saga', () => {
          test('should call upload and dispatch value', () => {
            const file = {}
            const field = 'preview_picture'
            const uploadResponse = {
              success: true
            }
            const formName = 'detailForm'
            const documentFormValue = {preview_picture: '123-4324'}
            const gen = sagas.uploadDocument(actions.uploadDocument(formName, field, file))

            expect(gen.next().value).to.eql(call(uploadRequest, file))
            expect(gen.next(uploadResponse).value).to.eql(call(documentToFormValueTransformer, uploadResponse, file))
            expect(gen.next(documentFormValue).value).to.eql(
              put(formActions.change(formName, field, documentFormValue))
            )

            expect(gen.next().done).to.be.true
          })
        })
      })
    })
  })
})
