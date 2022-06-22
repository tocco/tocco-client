import _isEmpty from 'lodash/isEmpty'
import {getFormValues, actions as formActions} from 'redux-form'
import {all, call, put, select, takeLatest, debounce} from 'redux-saga/effects'
import {rest, form, externalEvents} from 'tocco-app-extensions'
import {api} from 'tocco-util'

import {REDUX_FORM_NAME} from '../../components/MailAction'
import * as actions from './actions'

const mailActionSelector = state => state.mailAction
const inputSelector = state => state.input

export default function* sagas() {
  yield all([
    takeLatest(actions.LOAD_FORM_DEFINITION, loadFormDefinition),
    takeLatest(actions.SEND_MAIL, sendMail),
    debounce(500, actions.VALIDATE, validate)
  ])
}

export function* loadFormDefinition() {
  yield put(formActions.initialize(REDUX_FORM_NAME))
  const formDefinition = yield call(rest.fetchForm, 'Mailing_list_mail_action', 'create')
  yield put(actions.setFormDefinition(formDefinition))
}

export function* validate() {
  const formValues = yield select(getFormValues(REDUX_FORM_NAME))
  const {formDefinition} = yield select(mailActionSelector)
  const fieldDefinitions = yield call(form.getFieldDefinitions, formDefinition)
  const errors = form.syncValidation(fieldDefinitions, formDefinition)(formValues)
  yield put(actions.setFormValid(_isEmpty(errors)))
}

export function* sendMail() {
  yield put(actions.setFormValid(false))
  const {
    selection,
    actionProperties: {widgetKey, eventKey}
  } = yield select(inputSelector)
  const formValues = yield select(getFormValues(REDUX_FORM_NAME))
  const {formDefinition} = yield select(mailActionSelector)
  const fieldDefinitions = yield call(form.getFieldDefinitions, formDefinition)
  const flattened = yield call(form.formValuesToFlattenEntity, formValues, fieldDefinitions)
  const mailSettings = api.toEntity(flattened)
  const resource = '/actions/MailingListMailAction/send'
  const options = {
    method: 'POST',
    queryParams: {
      _widget_key: widgetKey
    },
    body: {
      selection,
      mailSettings,
      eventKey
    }
  }
  const response = yield call(rest.requestSaga, resource, options)
  const type = response.body.success ? 'onSuccess' : 'onError'
  yield put(
    externalEvents.fireExternalEvent(type, {
      title: response.body.message
    })
  )
}
