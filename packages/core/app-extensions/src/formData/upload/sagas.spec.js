import {actions as formActions} from 'redux-form'
import {expectSaga, testSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {call, put, takeEvery} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import * as actions from './actions'
import {documentToFormValueTransformer, uploadRequest} from './documents'
import * as sagas from './sagas'

describe('app-extensions', () => {
  describe('formData', () => {
    describe('upload', () => {
      describe('sagas', () => {
        describe('main saga', () => {
          test('should fork sagas', () => {
            const saga = testSaga(sagas.default)
            saga
              .next()
              .all([
                takeEvery(actions.UPLOAD_DOCUMENT, sagas.uploadDocument),
                takeEvery(actions.SET_DOCUMENT, sagas.setDocument)
              ])
          })
        })

        describe('uploadDocument saga', () => {
          test('should call upload and dispatch value', () => {
            const file = {}
            const field = 'relData.preview_picture'
            const fieldTransformed = 'relData--preview_picture'
            const uploadResponse = {
              success: true
            }
            const formName = 'detailForm'
            const documentFormValue = {preview_picture: '123-4324'}
            const gen = sagas.uploadDocument(actions.uploadDocument(formName, field, file))

            expect(gen.next().value).to.eql(call(uploadRequest, file))
            expect(gen.next(uploadResponse).value).to.eql(call(documentToFormValueTransformer, uploadResponse, file))
            expect(gen.next(documentFormValue).value).to.eql(
              put(formActions.change(formName, fieldTransformed, documentFormValue))
            )

            expect(gen.next().done).to.be.true
          })
        })

        describe('setDocument', () => {
          test('should link existing resource to field', () => {
            const field = 'relDocument'
            const formName = 'detailForm'
            const resourceId = 1
            const documentFormValue = {preview_picture: '123-4324'}
            return expectSaga(sagas.setDocument, {payload: {formName, field, resourceId}})
              .provide([
                [
                  matchers.call(rest.fetchEntity, 'Resource', resourceId, {paths: ['relContent.data']}),
                  {
                    paths: {
                      relContent: {
                        value: {
                          paths: {
                            data: {
                              value: documentFormValue
                            }
                          }
                        }
                      }
                    }
                  }
                ]
              ])
              .put(formActions.change(formName, field, {...documentFormValue, resourceKey: resourceId}))
              .run()
          })
        })
      })
    })
  })
})
