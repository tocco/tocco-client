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
  }),
  meta: React.PropTypes.shape({
    touched: React.PropTypes.bool,
    error: React.PropTypes.objectOf(React.PropTypes.arrayOf(React.PropTypes.string)),
    dirty: React.PropTypes.bool,
    submitting: React.PropTypes.bool
  }),
  formDefinitionField: React.PropTypes.object,
  entityField: React.PropTypes.object,
  modelField: React.PropTypes.object,
  editableValueUtils: React.PropTypes.object
}

export default ReduxFormFieldAdapter
