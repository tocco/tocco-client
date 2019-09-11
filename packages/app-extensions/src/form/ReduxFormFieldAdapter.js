import PropTypes from 'prop-types'
import _omit from 'lodash/omit'
import {injectIntl, intlShape} from 'react-intl'

import formField from '../formField'

const extractEventsFromInput = input => (
  _omit(input, ['name', 'value'])
)

const ReduxFormFieldAdapter = props => {
  const {
    input,
    meta: {dirty, touched, error, submitting},
    id,
    formDefinitionField,
    entityField,
    modelField,
    readOnlyForm,
    formName
  } = props

  const events = extractEventsFromInput(input)

  const fomFieldData = {
    formDefinitionField,
    modelField,
    id,
    formName,
    value: input.value,
    dirty,
    touched,
    submitting,
    events,
    error,
    entityField,
    readOnlyForm
  }
  const resources = {
    mandatoryTitle: props.intl.formatMessage({id: 'client.component.form.mandatoryFieldTitle'})
  }

  const primaryMapping = readOnlyForm ? props.readOnlyFormFieldMapping : props.formFieldMapping

  return formField.formFieldFactory(primaryMapping, props.readOnlyFormFieldMapping, fomFieldData, resources)
}

ReduxFormFieldAdapter.propTypes = {
  intl: intlShape.isRequired,
  id: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.any,
    name: PropTypes.string,
    onChange: PropTypes.func
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.objectOf(
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string]))
    ),
    dirty: PropTypes.bool,
    submitting: PropTypes.bool
  }).isRequired,
  formDefinitionField: PropTypes.object.isRequired,
  entityField: PropTypes.object,
  modelField: PropTypes.object,
  readOnlyForm: PropTypes.bool,
  formFieldMapping: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.objectOf(PropTypes.func)
  ])).isRequired,
  readOnlyFormFieldMapping: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.objectOf(PropTypes.func)
  ]))
}

export default injectIntl(ReduxFormFieldAdapter)
