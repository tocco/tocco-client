import PropTypes from 'prop-types'
import {useMemo} from 'react'

import field from '../field'
import {isMultipleFields, enhanceMultipleFieldsWithSeparators} from './utils'

const FieldProvider = ({fieldMappingType, formName, formField, entityField, value, info, events, formData}) => {
  const dataType = formField.dataType || formField.componentType

  const Field = useMemo(() => field.factory(fieldMappingType, dataType), [fieldMappingType, dataType])

  if (isMultipleFields(value, formField.dataType)) {
    return enhanceMultipleFieldsWithSeparators(
      value.map((v, idx) => (
        <Field
          formField={formField}
          entityField={entityField}
          formName={formName}
          mappingType={fieldMappingType}
          value={v}
          info={info}
          events={events}
          formData={formData}
          key={'valueField-' + formField.id + idx}
        />
      ))
    )
  }

  return (
    <Field
      formField={formField}
      entityField={entityField}
      formName={formName}
      mappingType={fieldMappingType}
      value={value}
      info={info}
      events={events}
      formData={formData}
    />
  )
}

FieldProvider.propTypes = {
  events: PropTypes.objectOf(PropTypes.func),
  fieldMappingType: PropTypes.string.isRequired,
  formData: PropTypes.object,
  formField: PropTypes.object,
  entityField: PropTypes.object,
  formName: PropTypes.string,
  info: PropTypes.object,
  value: PropTypes.any
}

export default FieldProvider
