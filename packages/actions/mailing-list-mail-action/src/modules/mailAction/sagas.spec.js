import {getFormValues, actions as formActions} from 'redux-form'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {all, takeLatest, debounce, select} from 'redux-saga/effects'
import {rest, form, externalEvents} from 'tocco-app-extensions'
import {api} from 'tocco-util'

import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

describe('mailing-list-mail-action', () => {
  describe('sagas', () => {
    describe('main saga', () => {
      test('should run all other sagas', () => {
        const generator = rootSaga()
        expect(generator.next().value).to.deep.equal(
          all([
            takeLatest(actions.LOAD_FORM_DEFINITION, sagas.loadFormDefinition),
            takeLatest(actions.SEND_MAIL, sagas.sendMail),
            debounce(500, actions.VALIDATE, sagas.validate)
          ])
        )
        expect(generator.next().done).to.be.true
      })
    })
    describe('loadFormDefinition', () => {
      test('should load form definition', () => {
        const formDefinition = {}
        return expectSaga(sagas.loadFormDefinition)
          .provide([[matchers.call.fn(rest.fetchForm), formDefinition]])
          .call(rest.fetchForm, 'Mailing_list_mail_action', 'create')
          .put(actions.setFormDefinition(formDefinition))
          .put(formActions.initialize('mailing-list-action'))
          .run()
      })
    })
    describe('validate', () => {
      const formDefinition = {}
      const validator = () => {
        /* nothing to do */
      }
      const fieldDefinitions = []
      const formValues = {}
      test('should set form invalid', () => {
        const errors = {
          'some-field': []
        }
        return expectSaga(sagas.validate)
          .provide([
            [select(getFormValues('mailing-list-action')), formValues],
            [select(sagas.mailActionSelector), formDefinition],
            [matchers.call.fn(form.getFieldDefinitions), fieldDefinitions],
            [matchers.call.fn(form.syncValidation), validator],
            [matchers.call.fn(validator), errors]
          ])
          .put(actions.setFormValid(false))
          .run()
      })
      test('should set form valid', () => {
        const errors = {}
        return expectSaga(sagas.validate)
          .provide([
            [select(getFormValues('mailing-list-action')), formValues],
            [select(sagas.mailActionSelector), formDefinition],
            [matchers.call.fn(form.getFieldDefinitions), fieldDefinitions],
            [matchers.call.fn(form.syncValidation), validator],
            [matchers.call.fn(validator), errors]
          ])
          .put(actions.setFormValid(true))
          .run()
      })
    })

    describe('sendMail', () => {
      const formDefinition = {}
      const fieldDefinitions = []
      const formValues = {}
      const flattened = {}
      const selection = {}
      const input = {
        selection,
        actionProperties: {
          widgetKey: 'widget',
          eventKey: 'event'
        }
      }
      const mailSettings = {}
      test('should send mail', () => {
        const response = {
          body: {
            success: true,
            message: 'message'
          }
        }
        return expectSaga(sagas.sendMail)
          .provide([
            [select(getFormValues('mailing-list-action')), formValues],
            [select(sagas.mailActionSelector), formDefinition],
            [select(sagas.inputSelector), input],
            [matchers.call.fn(form.getFieldDefinitions), fieldDefinitions],
            [matchers.call.fn(form.formValuesToFlattenEntity), fieldDefinitions],
            [matchers.call.fn(form.formValuesToFlattenEntity), flattened],
            [matchers.call.fn(api.toEntity), mailSettings],
            [matchers.call.fn(rest.requestSaga), response]
          ])
          .put(actions.setFormValid(false))
          .call.like({
            fn: rest.requestSaga,
            args: [
              '/actions/MailingListMailAction/send',
              {
                method: 'POST',
                queryParams: {
                  _widget_key: 'widget'
                },
                body: {
                  selection,
                  mailSettings,
                  eventKey: 'event'
                }
              }
            ]
          })
          .put(externalEvents.fireExternalEvent('onSuccess', {title: 'message'}))
          .run()
      })
      test('should handle error', () => {
        const response = {
          body: {
            success: false,
            message: 'error'
          }
        }
        return expectSaga(sagas.sendMail)
          .provide([
            [select(getFormValues('mailing-list-action')), formValues],
            [select(sagas.mailActionSelector), formDefinition],
            [select(sagas.inputSelector), input],
            [matchers.call.fn(form.getFieldDefinitions), fieldDefinitions],
            [matchers.call.fn(form.formValuesToFlattenEntity), fieldDefinitions],
            [matchers.call.fn(form.formValuesToFlattenEntity), flattened],
            [matchers.call.fn(api.toEntity), mailSettings],
            [matchers.call.fn(rest.requestSaga), response]
          ])
          .put(actions.setFormValid(false))
          .call.like({
            fn: rest.requestSaga,
            args: [
              '/actions/MailingListMailAction/send',
              {
                method: 'POST',
                queryParams: {
                  _widget_key: 'widget'
                },
                body: {
                  selection,
                  mailSettings,
                  eventKey: 'event'
                }
              }
            ]
          })
          .put(externalEvents.fireExternalEvent('onError', {title: 'error'}))
          .run()
      })
    })
  })
})
