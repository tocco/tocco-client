import React from 'react'
import PropTypes from 'prop-types'
import _get from 'lodash/get'
import {FormField} from 'tocco-ui'
import {consoleLogger} from 'tocco-util'

import fromData from '../formData'
import typeEditable from './typeEditable'

const FormFieldWrapper = props =>
  <FormField {...props} dirty={props.formData.isDirty || props.dirty} error={props.formData.errors || props.error}>
    {React.cloneElement(props.children, {formData: props.formData})}
  </FormField>

FormFieldWrapper.propTypes = {
  children: PropTypes.node,
  formData: PropTypes.object,
  dirty: PropTypes.bool,
  error: PropTypes.object
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

    const mandatory = !readOnly && _get(modelField, `validation.mandatory`, false)

    const type = formDefinitionField.dataType
    let requestedFromData
    if (typeEditable[type] && typeEditable[type].dataContainerProps) {
      requestedFromData = typeEditable[type].dataContainerProps({formField: formDefinitionField, modelField, formName})
    }

    return (
      <fromData.FormDataContainer {...requestedFromData}>
        <FormFieldWrapper
          key={id}
          id={id}
          label={formDefinitionField.label}
          mandatory={mandatory}
          mandatoryTitle={resources.mandatoryTitle}
          error={error}
          touched={touched}
          dirty={dirty}
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
