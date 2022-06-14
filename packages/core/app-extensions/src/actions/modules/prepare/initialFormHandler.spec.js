import {channel} from 'redux-saga'
import {expectSaga} from 'redux-saga-test-plan'

import {MODAL} from '../../../notification/modules/modal/actions'
import initialFormHandler, {addConditionsToFormDefinition} from './initialFormHandler'

describe('app-extensions', () => {
  describe('actions', () => {
    describe('prepare', () => {
      describe('initialFormHandler', () => {
        test('should dispatch confirm and return abort eql false in case of positive answer', () => {
          const response = {
            initialFormValues: {
              formDefinition: {
                model: 'User',
                form: {}
              },
              formData: {},
              formTitle: 'title',
              formMessage: 'message'
            }
          }

          const channelMock = channel()

          return expectSaga(initialFormHandler, response, null, null, null, {formApp: () => {}})
            .provide([
              {
                call(effect, next) {
                  return effect.fn === channel ? channelMock : next()
                }
              }
            ])
            .put.like({action: {type: MODAL}})
            .dispatch(channelMock.put({formValues: {firstname: 'test'}}))
            .returns({
              abort: false,
              params: {formData: {model: 'User', paths: {firstname: 'test'}}}
            })
            .run()
        })

        test('should return abort in case of negative answer', () => {
          const response = {
            initialFormValues: {
              formDefinition: {form: {}},
              formData: {},
              formTitle: 'title',
              formMessage: 'message'
            }
          }

          const channelMock = channel()

          return expectSaga(initialFormHandler, response, null, null, null, {formApp: () => {}})
            .provide([
              {
                call(effect, next) {
                  return effect.fn === channel ? channelMock : next()
                }
              }
            ])
            .put.like({action: {type: MODAL}})
            .dispatch(channelMock.put({formValues: null}))
            .returns({
              abort: true,
              params: {formData: null}
            })
            .run()
        })
        test('should not show form and return abort false if no form is defined', () => {
          const response = {initialFormValues: null}

          return expectSaga(initialFormHandler, response, null, null, null, {formApp: () => {}})
            .not.put.like({action: {type: MODAL}})
            .returns({
              abort: false
            })
            .run()
        })
      })

      describe('addConditionsToFormDefinition', () => {
        const formDefinition = {
          componentType: 'form',
          children: [
            {
              componentType: 'layout',
              children: [
                {
                  id: 'relEvent_status',
                  componentType: 'field-set',
                  children: [
                    {
                      id: 'relEvent_status',
                      dataType: 'single-remote-field'
                    }
                  ]
                },
                {
                  id: 'description',
                  componentType: 'field-set',
                  children: [
                    {
                      id: 'description',
                      dataType: 'string'
                    }
                  ]
                }
              ]
            }
          ]
        }

        test('if no conditions are set do not modify form', () => {
          const conditions = {}
          const modifiedForm = addConditionsToFormDefinition(formDefinition, conditions)
          expect(modifiedForm).to.equal(formDefinition)
        })

        test('if no condition matches a field do not modify form', () => {
          const conditions = {relEvent_type: 'system_entity'}
          const modifiedForm = addConditionsToFormDefinition(formDefinition, conditions)
          expect(modifiedForm).to.deep.equal(formDefinition)
        })

        test('if condition matches a field do modify form', () => {
          const conditions = {relEvent_status: 'evaluation_allowed'}
          const modifiedForm = addConditionsToFormDefinition(formDefinition, conditions)
          expect(modifiedForm).to.not.deep.equal(formDefinition)
          expect(modifiedForm.children[0].children[0].children[0].condition).to.equal('evaluation_allowed')
        })
      })
    })
  })
})
