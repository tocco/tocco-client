import PropTypes from 'prop-types'
import _omit from 'lodash/omit'
import {injectIntl, intlShape} from 'react-intl'

import formField from '../formField'

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
    submitting,
    events,
    error,
    onChange: input.onChange,
    entityField,
    utils: formFieldUtils
  }
  const resources = {
    mandatoryTitle: props.intl.formatMessage({id: 'client.component.form.mandatoryFieldTitle'})
  }

  const mapping = props.readOnlyForm ? props.readOnlyFormFieldMapping : props.formFieldMapping

  return formField.formFieldFactory(mapping, fomFieldData, resources)
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
  formFieldUtils: PropTypes.object.isRequired,
  modelField: PropTypes.object,
  readOnlyForm: PropTypes.bool,
  formFieldMapping: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.objectOf(PropTypes.func)
  ])).isRequired,
  readOnlyFormFieldMapping: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.objectOf(PropTypes.func)
  ])).isRequired
}

export default injectIntl(ReduxFormFieldAdapter)
