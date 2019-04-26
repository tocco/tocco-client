import React from 'react'
import _get from 'lodash/get'
import {FormField} from 'tocco-ui'
import {consoleLogger} from 'tocco-util'

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

    return (
      <FormField
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
      </FormField>

    )
  } catch (exception) {
    consoleLogger.logError('Error creating formField', exception)
    return <span/>
  }
}

const ValueField = props => {
  const {mapping, formName, formField, modelField, value, info, events, utils} = props
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

  return typeFactory(formField, modelField, formName, value, info, events, utils)
}
