import React from 'react'
import _get from 'lodash/get'
import {FormField} from 'tocco-ui'
import consoleLogger from '../consoleLogger'

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
      onChange,
      events,
      error,
      utils,
      readOnly
    } = data

    const readOnlyFinally = (
      formDefinitionField.displayType === 'READONLY'
      || readOnly === true
      || !_get(entityField, 'value.writable', true)
    )

    const mandatory = _get(modelField, `validation.mandatory`, false)

    const valueField = valueFieldFactory(
      mapping,
      formDefinitionField,
      modelField,
      {
        id,
        value,
        onChange,
        readOnly: readOnlyFinally,
        mandatory
      },
      events,
      utils
    )

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
        useLabel={formDefinitionField.useLabel === 'YES'}
      >
        {valueField}
      </FormField>
    )
  } catch (exception) {
    consoleLogger.logError('Error creating formField', exception)
    return <span/>
  }
}

const valueFieldFactory = (mapping, formField, modelField, props, events, utils) => {
  let typeFactory = mapping[formField.type]
  if (!typeFactory) {
    consoleLogger.log(`FormType '${formField.type}' not present in typeFactoryMap`)
    return <span/>
  } else if (typeof typeFactory === 'object') {
    typeFactory = typeFactory[modelField.type]
    if (!typeFactory) {
      consoleLogger.log(
        `FormType '${formField.type}' not present in typeFactoryMap for model field type ${modelField.type}`
      )
      return <span/>
    }
  }

  return typeFactory(formField, modelField, props, events, utils)
}
