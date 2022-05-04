import _omit from 'lodash/omit'
import PropTypes from 'prop-types'
import {injectIntl} from 'react-intl'

import formField from '../formField'

const extractEventsFromInput = input => _omit(input, ['name', 'value'])

const ReduxFormFieldAdapter = props => {
  const {
    input,
    meta: {dirty, touched, error, submitting},
    id,
    formDefinitionField,
    entityField,
    parentReadOnly,
    formName,
    mode
  } = props

  const events = extractEventsFromInput(input)

  const fomFieldData = {
    formDefinitionField,
    id,
    formName,
    value: input.value,
    dirty,
    touched,
    submitting,
    events,
    error,
    entityField,
    parentReadOnly,
    mode
  }
  const resources = {
    mandatoryTitle: props.intl.formatMessage({id: 'client.component.form.mandatoryFieldTitle'})
  }

  return <formField.FormField fieldMappingType={props.fieldMappingType} data={fomFieldData} resources={resources} />
}

ReduxFormFieldAdapter.propTypes = {
  intl: PropTypes.object.isRequired,
  id: PropTypes.string,
  formName: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.any,
    name: PropTypes.string,
    onChange: PropTypes.func
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string]))),
    dirty: PropTypes.bool,
    submitting: PropTypes.bool
  }).isRequired,
  formDefinitionField: PropTypes.object.isRequired,
  entityField: PropTypes.object,
  parentReadOnly: PropTypes.bool,
  fieldMappingType: PropTypes.string.isRequired,
  mode: PropTypes.string
}

export default injectIntl(ReduxFormFieldAdapter)
