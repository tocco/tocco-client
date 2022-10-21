import _get from 'lodash/get'
import PropTypes from 'prop-types'
import {consoleLogger} from 'tocco-util'

import field from '../field'
import fromData from '../formData'
import FieldProvider from './FieldProvider'
import FormFieldWrapper from './FormFieldWrapper'
import {isMultipleFields} from './utils'

const displayFieldTypes = ['display', 'description']

const displayFieldAsDisplayOnly = (value, componentType, dataType, parentReadOnly) => {
  if (parentReadOnly) {
    return true
  }

  if (displayFieldTypes.includes(componentType)) {
    return true
  }

  if (isMultipleFields(value, dataType)) {
    return true
  }

  return false
}

const FormField = ({fieldMappingType, data, resources = {}}) => {
  try {
    const {
      formDefinitionField,
      entityField,
      id,
      value,
      dirty,
      touched,
      events,
      error,
      submitting,
      parentReadOnly,
      formName,
      mode
    } = data

    const {componentType, dataType, readonly} = formDefinitionField

    const readOnly = parentReadOnly || readonly || submitting || !_get(entityField, 'writable', true)

    const isDisplay = displayFieldAsDisplayOnly(value, componentType, dataType, parentReadOnly)

    const type = formDefinitionField.dataType || formDefinitionField.componentType
    const typeEditable = field.editableComponentConfigs[fieldMappingType]?.[type]

    let requestedFromData
    if (typeEditable && typeEditable.dataContainerProps) {
      requestedFromData = typeEditable.dataContainerProps({formField: formDefinitionField, formName})
    }

    let mandatoryValidation = _get(formDefinitionField, 'validation.mandatory', false)
    if (typeEditable && typeEditable.getMandatoryValidation) {
      mandatoryValidation = typeEditable.getMandatoryValidation({formField: formDefinitionField}) || false
    }

    const mandatory = !readOnly && mandatoryValidation && mode !== 'search'

    const fixLabel = typeEditable && typeEditable.fixLabel && typeEditable.fixLabel()

    return (
      <fromData.FormDataContainer {...requestedFromData}>
        <FormFieldWrapper
          typeEditable={typeEditable}
          dirty={dirty}
          error={error}
          value={value}
          id={id}
          immutable={readOnly}
          isDisplay={isDisplay}
          key={id}
          label={formDefinitionField.label}
          mandatory={mandatory}
          mandatoryTitle={resources.mandatoryTitle}
          touched={touched}
          fixLabel={fixLabel}
          formField={formDefinitionField}
        >
          <FieldProvider
            fieldMappingType={isDisplay ? 'readOnly' : fieldMappingType}
            formName={formName}
            formField={formDefinitionField}
            entityField={entityField}
            value={value}
            info={{id, readOnly, mandatory}}
            events={events}
          />
        </FormFieldWrapper>
      </fromData.FormDataContainer>
    )
  } catch (exception) {
    consoleLogger.logError('Error creating formField', exception)
    return <span />
  }
}

FormField.propTypes = {
  fieldMappingType: PropTypes.string.isRequired,
  data: PropTypes.shape({
    formDefinitionField: PropTypes.object,
    id: PropTypes.string,
    formName: PropTypes.string,
    value: PropTypes.any,
    parentReadOnly: PropTypes.bool,
    touched: PropTypes.bool,
    error: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string]))),
    dirty: PropTypes.bool,
    submitting: PropTypes.bool,
    events: PropTypes.object,
    mode: PropTypes.string,
    entityField: PropTypes.object
  }).isRequired,
  resources: PropTypes.object
}

export default FormField
