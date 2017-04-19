import React from 'react'
import {consoleLogger} from 'tocco-util'
import editableValueFieldFactory from './fieldTypeFactories/editableValue'
import subGridFactory from './fieldTypeFactories/subGrid'

const typeFactoryMap = {
  'ch.tocco.nice2.model.form.components.Form': null,
  'ch.tocco.nice2.model.form.components.Template': null,
  'ch.tocco.nice2.model.form.components.action.Action': null,
  'ch.tocco.nice2.model.form.components.action.ActionSeparator': null,
  'ch.tocco.nice2.model.form.components.composite.LocationField': null,
  'ch.tocco.nice2.model.form.components.layout.HorizontalBox': null,
  'ch.tocco.nice2.model.form.components.layout.VerticalBox': null,
  'ch.tocco.nice2.model.form.components.navigation.IteratorComponent': null,
  'ch.tocco.nice2.model.form.components.simple.BirthDateField': editableValueFieldFactory('birthdate'),
  'ch.tocco.nice2.model.form.components.simple.Checkbox': editableValueFieldFactory('boolean'),
  'ch.tocco.nice2.model.form.components.simple.CodeField': editableValueFieldFactory('text'),
  'ch.tocco.nice2.model.form.components.simple.ConstantField': null,
  'ch.tocco.nice2.model.form.components.simple.CreatePasswordField': null,
  'ch.tocco.nice2.model.form.components.simple.CustomDataField': null,
  'ch.tocco.nice2.model.form.components.simple.DataAmountField': editableValueFieldFactory('number'),
  'ch.tocco.nice2.model.form.components.simple.DateField': editableValueFieldFactory('date'),
  'ch.tocco.nice2.model.form.components.simple.DatetimeField': editableValueFieldFactory('datetime'),
  'ch.tocco.nice2.model.form.components.simple.DescriptionField': null,
  'ch.tocco.nice2.model.form.components.simple.DisplayExpressionFieldFacade': null,
  'ch.tocco.nice2.model.form.components.simple.DisplayField': null,
  'ch.tocco.nice2.model.form.components.simple.DocumentField': editableValueFieldFactory('document'),
  'ch.tocco.nice2.model.form.components.simple.DurationField': null,
  'ch.tocco.nice2.model.form.components.simple.EmailField': editableValueFieldFactory('email'),
  'ch.tocco.nice2.model.form.components.simple.HtmlField': editableValueFieldFactory('text'),
  'ch.tocco.nice2.model.form.components.simple.ImageField': editableValueFieldFactory('document'),
  'ch.tocco.nice2.model.form.components.simple.LoginField': editableValueFieldFactory('string'),
  'ch.tocco.nice2.model.form.components.simple.MoneyAmountField': editableValueFieldFactory('number'),
  'ch.tocco.nice2.model.form.components.simple.MultiRemoteField': editableValueFieldFactory('multi-remote'),
  'ch.tocco.nice2.model.form.components.simple.MultiSelectBox': editableValueFieldFactory('multi-select'),
  'ch.tocco.nice2.model.form.components.simple.NamedUploadField': editableValueFieldFactory('document'),
  'ch.tocco.nice2.model.form.components.simple.NumberField': editableValueFieldFactory('number'),
  'ch.tocco.nice2.model.form.components.simple.PasswordField': null,
  'ch.tocco.nice2.model.form.components.simple.PathField': null,
  'ch.tocco.nice2.model.form.components.simple.PercentField': editableValueFieldFactory('number'),
  'ch.tocco.nice2.model.form.components.simple.PhoneField': editableValueFieldFactory('phone'),
  'ch.tocco.nice2.model.form.components.simple.PulldownDateField': editableValueFieldFactory('date'),
  'ch.tocco.nice2.model.form.components.simple.RangeField': {
    'date': editableValueFieldFactory('date-range'),
    'birthdate': editableValueFieldFactory('date-range')
  },
  'ch.tocco.nice2.model.form.components.simple.RemoteField': editableValueFieldFactory('remote'),
  'ch.tocco.nice2.model.form.components.simple.SingleSelectBox': editableValueFieldFactory('single-select'),
  'ch.tocco.nice2.model.form.components.simple.TextArea': editableValueFieldFactory('text'),
  'ch.tocco.nice2.model.form.components.simple.TextField': editableValueFieldFactory('string'),
  'ch.tocco.nice2.model.form.components.simple.TimeField': null,
  'ch.tocco.nice2.model.form.components.simple.UploadField': editableValueFieldFactory('document'),
  'ch.tocco.nice2.model.form.components.simple.UrlField': editableValueFieldFactory('url'),
  'ch.tocco.nice2.model.form.components.simple.UuidField': editableValueFieldFactory('string'),
  'ch.tocco.nice2.model.form.components.table.Column': null,
  'ch.tocco.nice2.model.form.components.table.Table': subGridFactory()
}

export default (formField, modelField, props, events, utils) => {
  let typeFactory = typeFactoryMap[formField.type]
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
