import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import _get from 'lodash/get'
import {StatedValue, Typography} from 'tocco-ui'
import {consoleLogger} from 'tocco-util'

import field from '../field'
import fromData from '../formData'

const FormFieldWrapper = props => {
  const hasValueOverwrite = props.typeEditable && props.typeEditable.hasValue
    && props.typeEditable.hasValue(props.formData.formValues, props.formField)

  return <StatedValue
    {...props}
    dirty={props.formData.isDirty || props.dirty}
    error={props.formData.errors || props.error}
    hasValue={hasValueOverwrite || props.hasValue}
  >
    {React.cloneElement(props.children, {formData: props.formData})}
  </StatedValue>
}

FormFieldWrapper.propTypes = {
  typeEditable: PropTypes.object,
  children: PropTypes.node,
  formData: PropTypes.object,
  formField: PropTypes.object,
  dirty: PropTypes.bool,
  error: PropTypes.object,
  hasValue: PropTypes.bool
}

const displayFieldTypes = ['display', 'description']
const multiTypes = ['multi-select-box', 'multi-remote-field', 'search-filter']

const isMultipleFields = (value, dataType) =>
  Array.isArray(value) && !multiTypes.includes(dataType)

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
      modelField,
      entityField,
      id,
      value,
      dirty,
      touched,
      events,
      error,
      submitting,
      parentReadOnly,
      formName
    } = data

    const {
      componentType,
      dataType,
      readonly
    } = formDefinitionField

    const readOnly = (
      parentReadOnly
      || readonly
      || submitting
      || !_get(entityField, 'writable', true)
    )

    const mandatory = !readOnly && _get(modelField, 'validation.mandatory', false)
    const hasValue = value !== null && value !== undefined && (value.length === undefined || value.length > 0)
    const isDisplay = displayFieldAsDisplayOnly(value, componentType, dataType, parentReadOnly)

    const type = formDefinitionField.dataType || formDefinitionField.componentType
    let requestedFromData

    const typeEditable = field.editableTypeConfigs[type]

    if (typeEditable && typeEditable.dataContainerProps) {
      requestedFromData = typeEditable.dataContainerProps({formField: formDefinitionField, modelField, formName})
    }

    const fixLabel = typeEditable && typeEditable.fixLabel && typeEditable.fixLabel()

    return (
      <fromData.FormDataContainer {...requestedFromData}>
        <FormFieldWrapper
          typeEditable={typeEditable}
          dirty={dirty}
          error={error}
          hasValue={hasValue}
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
            modelField={modelField}
            value={value}
            info={{id, readOnly, mandatory}}
            events={events}
          />
        </FormFieldWrapper>
      </fromData.FormDataContainer>
    )
  } catch (exception) {
    consoleLogger.logError('Error creating formField', exception)
    return <span/>
  }
}

export const MultiSeparator = () => (<Typography.Span>, </Typography.Span>)

const ValueField = ({
  fieldMappingType,
  formName,
  formField,
  modelField,
  value,
  info,
  events,
  formData
}) => {
  const Field = useMemo(() =>
    field.factory(fieldMappingType, formField.dataType || formField.componentType), []
  )

  if (isMultipleFields(value, formField.dataType)) {
    return value
      .map((v, idx) => <Field
        formField={formField}
        modelField={modelField}
        formName={formName}
        value={v}
        info={info}
        events={events}
        formData={formData}
        key={'valueField-' + formField.id + idx}
      />)
      .reduce((prev, curr, idx) => [prev, <MultiSeparator key={'sep' + idx}/>, curr])
  }

  return <Field
    formField={formField}
    modelField={modelField}
    formName={formName}
    value={value}
    info={info}
    events={events}
    formData={formData}
  />
}

ValueField.propTypes = {
  events: PropTypes.objectOf(PropTypes.func),
  fieldMappingType: PropTypes.string.isRequired,
  formData: PropTypes.object,
  formField: PropTypes.object,
  formName: PropTypes.string,
  info: PropTypes.object,
  modelField: PropTypes.object,
  value: PropTypes.any
}
