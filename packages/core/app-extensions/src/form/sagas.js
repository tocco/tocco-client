import {selectUnit} from '@formatjs/intl-utils'
import _get from 'lodash/get'
import {FormattedMessage, FormattedRelativeTime} from 'react-intl'
import {actions as formActions, getFormValues} from 'redux-form'
import * as formActionTypes from 'redux-form/es/actionTypes'
import {all, call, put, select, debounce, takeEvery} from 'redux-saga/effects'

import notification from '../notification'
import rest from '../rest'
import formErrorUtils from './formErrors'
import {isValueEmpty} from './reduxForm'
import {getEntityForSubmit} from './sagasUtils'

export default function* sagas(formConfig) {
  yield all([
    debounce(500, formActionTypes.CHANGE, onChange, formConfig),
    takeEvery(formActionTypes.STOP_ASYNC_VALIDATION, asyncValidationStop)
  ])
}

export function* autoComplete({formId}, triggerFieldName, entity, autoCompleteEndpoint) {
  const options = {
    method: 'POST',
    body: {
      triggerField: triggerFieldName,
      entity
    },
    acceptedStatusCodes: [403]
  }

  const response = yield call(rest.requestSaga, autoCompleteEndpoint, options)
  const values = _get(response, 'body.values', [])
  const formValues = yield select(getFormValues(formId))

  yield all(
    Object.keys(values).map(fieldName => {
      const value = values[fieldName]
      const currentFieldValue = formValues[fieldName]
      if (value.mode === 'override' || (value.mode === 'if_empty' && isValueEmpty(currentFieldValue))) {
        return put(formActions.change(formId, fieldName, value.value))
      }
      return null
    })
  )
}

export function* onChange(formConfig, {meta}) {
  const {stateSelector} = formConfig
  const {field} = meta
  const fieldDefinition = (yield select(stateSelector)).fieldDefinitions.find(fd => fd.id === field)
  if (fieldDefinition && fieldDefinition.autoCompleteEndpoint) {
    const entity = yield call(getEntityForSubmit, formConfig)
    yield call(autoComplete, formConfig, field, entity, fieldDefinition.autoCompleteEndpoint)
  }
}

export function* asyncValidationStop({payload}) {
  if (payload) {
    const hasOutdatedError = formErrorUtils.hasOutdatedError(payload)
    if (hasOutdatedError) {
      const outdatedError = formErrorUtils.getOutdatedError(payload)
      const {value: timeStampValue, unit} = selectUnit(new Date(outdatedError.updateTimestamp))
      const titleId = `client.component.form.${outdatedError.sameEntity ? 'outdated' : 'relatedOutdated'}ErrorTitle`

      yield put(
        notification.toaster({
          type: 'warning',
          key: 'outdated-warning',
          title: (
            <FormattedMessage
              id={titleId}
              values={{
                model: outdatedError.model,
                key: outdatedError.key
              }}
            />
          ),
          body: (
            <FormattedMessage
              id="client.component.form.outdatedErrorDescription"
              values={{
                ago: <FormattedRelativeTime value={timeStampValue} unit={unit} />,
                user: outdatedError.updateUser
              }}
            />
          )
        })
      )
    }
  }
}
