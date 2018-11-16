import {channel} from 'redux-saga'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'

import initialForm from './initialForm'
import {MODAL_COMPONENT} from '../../../notifier/modules/actions'
import rest from '../../../rest'

describe('app-extensions', () => {
  describe('actions', () => {
    describe('preAction', () => {
      const config = {formApp: () => {}}
      describe('initialForm', () => {
        describe('shouldRun', () => {
          test('should return true if attribute is set', () => {
            expect(initialForm.shouldRun({formDataEntityModel: 'Test'}, [])).to.be.true
          })

          test('should return false if attribute is not set or false', () => {
            expect(initialForm.shouldRun({formDataEntityModel: null}, [])).to.be.false
            expect(initialForm.shouldRun({}, [])).to.be.false
          })
        })

        describe('run', () => {
          const params = {}
          const ids = ['2123']
          const definition = {formDataEntityModel: 'SessionOnly'}

          const channelMock = channel()

          test(
            'should dispatch confirm and return abort eql false in case of positive answer',
            () => {
              return expectSaga(initialForm.run, params, definition, ids, config)
                .provide([{
                  call(effect, next) {
                    return effect.fn === channel ? channelMock : next()
                  }
                },
                [matchers.call.fn(rest.fetchModel), {}],
                [matchers.call.fn(rest.fetchForm), {}]
                ])
                .put.like({action: {type: MODAL_COMPONENT}})
                .dispatch(channelMock.put({formValues: {firstname: 'test'}}))
                .returns({
                  abort: false,
                  params: {formData: {model: definition.formDataEntityModel, paths: {firstname: 'test'}}}
                })
                .run()
            }
          )

          test('should return abort in case of negative answer', () => {
            return expectSaga(initialForm.run, params, definition, ids, config)
              .provide([
                {
                  call(effect, next) {
                    return effect.fn === channel ? channelMock : next()
                  }
                },
                [matchers.call.fn(rest.fetchModel), {}],
                [matchers.call.fn(rest.fetchForm), {}]
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
