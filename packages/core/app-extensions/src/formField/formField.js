import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, {useMemo} from 'react'
import {StatedValue, Typography} from 'tocco-ui'
import {consoleLogger} from 'tocco-util'

import field from '../field'
import fromData from '../formData'

const FormFieldWrapper = props => {
  const {typeEditable, value, formData, formField, dirty, error, children} = props
  const hasOverwrite = typeEditable && typeEditable.hasValue
  const hasValue = hasOverwrite
    ? typeEditable.hasValue({formValues: formData.formValues, formField, value})
    : value !== null && value !== undefined && value !== false && (value.length === undefined || value.length > 0)

  return (
    <StatedValue {...props} dirty={formData.isDirty || dirty} error={formData.errors || error} hasValue={hasValue}>
      {React.cloneElement(children, {formData: formData})}
    </StatedValue>
  )
}

FormFieldWrapper.propTypes = {
  typeEditable: PropTypes.object,
  children: PropTypes.node,
  formData: PropTypes.object,
  formField: PropTypes.object,
  dirty: PropTypes.bool,
  error: PropTypes.object,
  value: PropTypes.any
}

const displayFieldTypes = ['display', 'description']
const multiTypes = ['multi-select-box', 'multi-remote-field', 'search-filter']

const isMultipleFields = (value, dataType) => Array.isArray(value) && !multiTypes.includes(dataType)

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

export const formFieldFactory = (fieldMappingType, data, resources = {}) => {
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
    const typeEditable = field.editableTypeConfigs[fieldMappingType]?.[type]

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
          <ValueField
            fieldMappingType={isDisplay ? 'readOnly' : fieldMappingType}
            formName={formName}
            formField={formDefinitionField}
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

export const MultiSeparator = () => <Typography.Span>, </Typography.Span>

const ValueField = ({fieldMappingType, formName, formField, value, info, events, formData}) => {
  const formFieldType = formField.dataType || formField.componentType
  const Field = useMemo(() => field.factory(fieldMappingType, formFieldType), [fieldMappingType, formFieldType])

  if (isMultipleFields(value, formField.dataType)) {
    return value
      .map((v, idx) => (
        <Field
          formField={formField}
          formName={formName}
          mappingType={fieldMappingType}
          value={v}
          info={info}
          events={events}
          formData={formData}
          key={'valueField-' + formField.id + idx}
        />
      ))
      .reduce((prev, curr, idx) => [prev, <MultiSeparator key={'sep' + idx} />, curr])
  }

  return (
    <Field
      formField={formField}
      formName={formName}
      mappingType={fieldMappingType}
      value={value}
      info={info}
      events={events}
      formData={formData}
    />
  )
}

ValueField.propTypes = {
  events: PropTypes.objectOf(PropTypes.func),
  fieldMappingType: PropTypes.string.isRequired,
  formData: PropTypes.object,
  formField: PropTypes.object,
  formName: PropTypes.string,
  info: PropTypes.object,
  value: PropTypes.any
}
