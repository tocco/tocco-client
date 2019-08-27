import React from 'react'
import PropTypes from 'prop-types'
import _get from 'lodash/get'
import {StatedValue} from 'tocco-ui'
import {consoleLogger} from 'tocco-util'

import fromData from '../formData'
import typeEditables from './typeEditable'

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

export const formFieldFactory = (mapping, data, resources = {}) => {
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
      readOnlyForm,
      formName
    } = data

    const readOnly = (
      readOnlyForm
      || formDefinitionField.readonly
      || submitting
      || !_get(entityField, 'writable', true)
    )

    const mandatory = !readOnly && _get(modelField, 'validation.mandatory', false)
    const hasValue = value !== null && value !== undefined && (value.length === undefined || value.length > 0)
    const isDisplay = data.formDefinitionField.componentType === 'display' || readOnlyForm

    const type = formDefinitionField.dataType || formDefinitionField.componentType
    let requestedFromData

    const typeEditable = typeEditables[type]

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
            mapping={mapping}
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

const ValueField = props => {
  const {mapping, formName, formField, modelField, value, info, events, formData} = props
  const type = formField.dataType ? 'dataType' : 'componentType'

  let typeFactory = mapping[formField[type]]

  if (!typeFactory) {
    consoleLogger.log(`FormType '${formField.dataType}' not present in typeFactoryMap`)
    return <span/>
  } else if (typeof typeFactory === 'object') {
    typeFactory = typeFactory[modelField.type]
    if (!typeFactory) {
      consoleLogger.log(
        `FormType '${formField.dataType}' not present in typeFactoryMap for model field type ${modelField.type}`
      )
      return <span/>
    }
  }

  return typeFactory(formField, modelField, formName, value, info, events, formData)
}
