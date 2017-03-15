import React from 'react'
import _omit from 'lodash/omit'
import FormField from '../../../../components/FormField'

const ReduxFormFieldAdapter = props => {
  const {
    input,
    meta: {dirty, touched, error, submitting},
    id,
    formDefinitionField,
    entityField,
    modelField,
    editableValueUtils
  } = props

  const extractEventsFromInput = () => (
    _omit(input, ['name', 'value', 'onChange'])
  )

  return (
    <div>
      <FormField
        id={id}
        formDefinitionField={formDefinitionField}
        entityField={entityField}
        modelField={modelField}
        value={input.value}
        onChange={input.onChange}
        error={error}
        events={extractEventsFromInput()}
        touched={touched}
        dirty={dirty}
        readOnly={submitting}
        editableValueUtils={editableValueUtils}
      />
    </div>
  )
}

ReduxFormFieldAdapter.propTypes = {
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
  entityField: React.PropTypes.object.isRequired,
  editableValueUtils: React.PropTypes.object.isRequired,
  modelField: React.PropTypes.object
}

export default ReduxFormFieldAdapter
