import PropTypes from 'prop-types'
import {useMemo} from 'react'

import field from '../field'
import MultipleFieldsSeparator from './MultipleFieldsSeparator'
import {isMultipleFields} from './utils'

const FieldProvider = ({fieldMappingType, formName, formField, value, info, events, formData}) => {
  const dataType = formField.dataType || formField.componentType

  const Field = useMemo(() => field.factory(fieldMappingType, dataType), [fieldMappingType, dataType])

  if (isMultipleFields(value, formField.dataType)) {
    return value
      .map((v, idx) => (
        <Field
          formField={formField}
          formName={formName}
          value={v}
          info={info}
          events={events}
          formData={formData}
          key={'valueField-' + formField.id + idx}
        />
      ))
      .reduce((prev, curr, idx) => [prev, <MultipleFieldsSeparator key={`sep${idx}`} />, curr])
  }

  return (
    <Field formField={formField} formName={formName} value={value} info={info} events={events} formData={formData} />
  )
}

FieldProvider.propTypes = {
  events: PropTypes.objectOf(PropTypes.func),
  fieldMappingType: PropTypes.string.isRequired,
  formData: PropTypes.object,
  formField: PropTypes.object,
  formName: PropTypes.string,
  info: PropTypes.object,
  value: PropTypes.any
}

export default FieldProvider
