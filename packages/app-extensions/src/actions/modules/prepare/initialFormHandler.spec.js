import {expectSaga} from 'redux-saga-test-plan'
import {channel} from 'redux-saga'

import initialFormHandler from './initialFormHandler'
import {MODAL} from '../../../notification/modules/modal/actions'

describe('app-extensions', () => {
  describe('actions', () => {
    describe('prepare', () => {
      describe('initialFormHandler', () => {
        test('should dispatch confirm and return abort eql false in case of positive answer',
          () => {
            const response = {
              initialFormValues: {
                formDefinition: {model: 'User'},
                formData: {},
                formTitle: 'title',
                formMessage: 'message'
              }
            }

            const channelMock = channel()

            return expectSaga(initialFormHandler, response, null, null, null, {formApp: () => {}})
              .provide([{
                call(effect, next) {
                  return effect.fn === channel ? channelMock : next()
                }
              }])
              .put.like({action: {type: MODAL}})
              .dispatch(channelMock.put({formValues: {firstname: 'test'}}))
              .returns({
                abort: false,
                params: {formData: {model: 'User', paths: {firstname: 'test'}}}
              })
              .run()
          })

        test('should return abort in case of negative answer',
          () => {
            const response = {
              initialFormValues: {
                formDefinition: {},
                formData: {},
                formTitle: 'title',
                formMessage: 'message'
              }
            }

            const channelMock = channel()

            return expectSaga(initialFormHandler, response, null, null, null, {formApp: () => {}})
              .provide([{
                call(effect, next) {
                  return effect.fn === channel ? channelMock : next()
                }
              }])
              .put.like({action: {type: MODAL}})
              .dispatch(channelMock.put({formValues: null}))
              .returns({
                abort: true,
                params: {formData: null}
              })
              .run()
          }
        )
        test('should not show form and return abort false if no form is defined',
          () => {
            const response = {initialFormValues: null}

            return expectSaga(initialFormHandler, response, null, null, null, {formApp: () => {}})
              .not.put.like({action: {type: MODAL}})
              .returns({
                abort: false
              })
              .run()
          })
      })
    })
  })
})
