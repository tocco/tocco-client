import React from 'react'
import _omit from 'lodash/omit'
import {injectIntl, intlShape} from 'react-intl'

import {formField} from 'tocco-util'
import formFieldMapping from '../../util/detailView/formFieldMapping'
import readOnlyFormFieldMapping from '../../util/detailView/readOnlyFormFieldMapping'

const extractEventsFromInput = input => (
  _omit(input, ['name', 'value', 'onChange'])
)

const ReduxFormFieldAdapter = props => {
  const {
    input,
    meta: {dirty, touched, error, submitting},
    id,
    formDefinitionField,
    entityField,
    modelField,
    formFieldUtils
  } = props

  const events = extractEventsFromInput(input)

  const fomFieldData = {
    formDefinitionField,
    modelField,
    id,
    value: input.value,
    dirty,
    touched,
    readOnly: submitting,
    events,
    error,
    onChange: input.onChange,
    entityField,
    utils: formFieldUtils
  }
  const resources = {
    mandatoryTitle: props.intl.formatMessage({id: 'client.entity-browser.detail.mandatoryFieldTitle'})
  }

  const mapping = props.readOnlyForm ? readOnlyFormFieldMapping : formFieldMapping

  return formField.formFieldFactory(mapping, fomFieldData, resources)
}

ReduxFormFieldAdapter.propTypes = {
  intl: intlShape.isRequired,
  id: React.PropTypes.string,
  input: React.PropTypes.shape({
    value: React.PropTypes.any,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func
  }).isRequired,
  meta: React.PropTypes.shape({
    touched: React.PropTypes.bool,
    error: React.PropTypes.objectOf(React.PropTypes.arrayOf(React.PropTypes.string)),
    dirty: React.PropTypes.bool,
    submitting: React.PropTypes.bool
  }).isRequired,
  formDefinitionField: React.PropTypes.object.isRequired,
  entityField: React.PropTypes.object,
  formFieldUtils: React.PropTypes.object.isRequired,
  modelField: React.PropTypes.object,
  readOnlyForm: React.PropTypes.bool
}

export default injectIntl(ReduxFormFieldAdapter)
