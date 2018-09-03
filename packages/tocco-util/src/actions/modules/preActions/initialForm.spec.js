import {channel} from 'redux-saga'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'

import initialForm from './initialForm'
import {MODAL_COMPONENT} from '../../../notifier/modules/actions'
import {fetchForm, fetchModel} from '../../../rest'

describe('tocco-util', () => {
  describe('actions', () => {
    describe('preAction', () => {
      describe('initialForm', () => {
        describe('shouldRun', () => {
          it('should return true if attribute is set', () => {
            expect(initialForm.shouldRun({formDataEntityModel: 'Test'}, [])).to.be.true
          })

          it('should return false if attribute is not set or false', () => {
            expect(initialForm.shouldRun({formDataEntityModel: null}, [])).to.be.false
            expect(initialForm.shouldRun({}, [])).to.be.false
          })
        })

        describe('run', () => {
          const params = {}
          const ids = ['2123']
          const definition = {formDataEntityModel: 'SessionOnly'}

          const channelMock = channel()

          it('should dispatch confirm and return abort eql false in case of positive answer', () => {
            return expectSaga(initialForm.run, params, definition, ids)
              .provide([{
                call(effect, next) {
                  return effect.fn === channel ? channelMock : next()
                }
              },
              [matchers.call.fn(fetchModel), {}],
              [matchers.call.fn(fetchForm), {}]
              ])
              .put.like({action: {type: MODAL_COMPONENT}})
              .dispatch(channelMock.put({formValues: {firstname: 'test'}}))
              .returns({
                abort: false,
                params: {formData: {model: definition.formDataEntityModel, paths: {firstname: 'test'}}}
              })
              .run()
          })

          it('should return abort in case of negative answer', () => {
            return expectSaga(initialForm.run, params, definition, ids)
              .provide([
                {
                  call(effect, next) {
                    return effect.fn === channel ? channelMock : next()
                  }
                },
                [matchers.call.fn(fetchModel), {}],
                [matchers.call.fn(fetchForm), {}]
              ])
              .dispatch(channelMock.put({formValues: null}))
              .returns({abort: true})
              .run()
          })
        })
      })
    })
  })
})
