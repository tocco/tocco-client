import * as actions from './actions'
import {all, call, fork, put, select, takeEvery, takeLatest} from 'redux-saga/effects'
import {getFormValues, actions as formActions} from 'redux-form'
import {externalEvents, form as formUtil} from 'tocco-util'
import * as relationEntitiesActions from '../../utils/form/relationEntity/actions'
import * as remoteEntitiesActions from '../../utils/form/remoteEntity/actions'
import * as relationEntitiesSagas from '../../utils/form/relationEntity/sagas'
import * as remoteEntitiesSagas from '../../utils/form/remoteEntity/sagas'
import * as documentActions from '../../utils/form/document/actions'
import * as documentSagas from '../../utils/form/document/sagas'

const FORM_ID = 'simpleForm'
export const inputSelector = state => state.input
export const selector = state => state.simpleForm

export default function* sagas() {
  yield all([
    fork(takeEvery, actions.INITIALIZE_QUESTION_FORM, initialize),
    fork(takeEvery, actions.SUBMIT, submit),
    fork(takeEvery, actions.CANCEL, cancel),
    fork(takeLatest, relationEntitiesActions.LOAD_RELATION_ENTITY, relationEntitiesSagas.loadRelationEntity),
    fork(takeLatest, remoteEntitiesActions.LOAD_REMOTE_ENTITY, remoteEntitiesSagas.loadRemoteEntity),
    fork(takeLatest, documentActions.UPLOAD_DOCUMENT, documentSagas.uploadDocument)
  ])
}

export function* initialize() {
  const {form} = yield select(inputSelector)
  const fieldDefinitions = yield call(formUtil.getFieldDefinitions, form)
  const defaultValues = yield call(formUtil.getDefaultValues, fieldDefinitions)
  yield put(formActions.initialize(FORM_ID, defaultValues))
}

export function* submit() {
  const values = yield select(getFormValues(FORM_ID))
  yield put(externalEvents.fireExternalEvent('onSubmit', {...values}))
}

export function* cancel() {
  const values = yield select(getFormValues(FORM_ID))
  yield put(externalEvents.fireExternalEvent('onCancel', {...values}))
}
