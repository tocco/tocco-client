import React from 'react'
import EditableValueFieldFactory from './editableValueFieldFactory'

import SubGrid from '../../routes/detail/components/SubGrid'

const fromDefinitionTypeMap = {
  'ch.tocco.nice2.model.form.components.simple.BirthDateField': EditableValueFieldFactory('birthdate'),
  'ch.tocco.nice2.model.form.components.simple.Checkbox': EditableValueFieldFactory('boolean'),
  'ch.tocco.nice2.model.form.components.simple.DateField': EditableValueFieldFactory('date'),
  'ch.tocco.nice2.model.form.components.simple.DatetimeField': EditableValueFieldFactory('datetime'),
  'ch.tocco.nice2.model.form.components.simple.EmailField': EditableValueFieldFactory('email'),
  'ch.tocco.nice2.model.form.components.simple.MultiRemoteField': EditableValueFieldFactory('multi-remote'),
  'ch.tocco.nice2.model.form.components.simple.MultiSelectBox': EditableValueFieldFactory('multi-select'),
  'ch.tocco.nice2.model.form.components.simple.NumberField': EditableValueFieldFactory('number'),
  'ch.tocco.nice2.model.form.components.simple.PhoneField': EditableValueFieldFactory('phone'),
  'ch.tocco.nice2.model.form.components.simple.TextArea': EditableValueFieldFactory('text'),
  'ch.tocco.nice2.model.form.components.simple.TextField': EditableValueFieldFactory('string'),
  'ch.tocco.nice2.model.form.components.simple.UrlField': EditableValueFieldFactory('url'),
  'ch.tocco.nice2.model.form.components.simple.RemoteField': EditableValueFieldFactory('remote'),
  'ch.tocco.nice2.model.form.components.simple.SingleSelectBox': EditableValueFieldFactory('single-select'),
  'ch.tocco.nice2.model.form.components.simple.Subgrid': (formField, modelField, props, events, utils) => (
    <SubGrid {...props}/>
  ),
  'ch.tocco.nice2.model.form.components.simple.DocumentField': null,
  'ch.tocco.nice2.model.form.components.simple.DurationField': null,
  'ch.tocco.nice2.model.form.components.simple.TimeField': null,
  'ch.tocco.nice2.model.form.components.simple.PulldownDateField': null,
  'ch.tocco.nice2.model.form.components.simple.UploadField': null,
  'ch.tocco.nice2.model.form.components.simple.NamedUploadField': null,
  'ch.tocco.nice2.model.form.components.simple.DmsDocumentField': null,
  'ch.tocco.nice2.model.form.components.simple.DocumentFolderField': null,
  'ch.tocco.nice2.model.form.components.simple.ImageField': null,
  'ch.tocco.nice2.model.form.components.simple.ListTextArea': null,
  'ch.tocco.nice2.model.form.components.simple.UuidField': null,
  'ch.tocco.nice2.model.form.components.simple.PathField': null,
  'ch.tocco.nice2.model.form.components.simple.StatusField': null,
  'ch.tocco.nice2.model.form.components.simple.HtmlField': null,
  'ch.tocco.nice2.model.form.components.simple.CodeField': null,
  'ch.tocco.nice2.model.form.components.simple.LinkField': null,
  'ch.tocco.nice2.model.form.components.simple.ConstantField': null,
  'ch.tocco.nice2.model.form.components.simple.ListPanel': null,
  'ch.tocco.nice2.model.form.components.simple.ReferencesListPanel': null,
  'ch.tocco.nice2.model.form.components.simple.PasswordField': null,
  'ch.tocco.nice2.model.form.components.simple.CreatePasswordField': null,
  'ch.tocco.nice2.model.form.components.simple.RangeField': null,
  'ch.tocco.nice2.model.form.components.simple.DisplayField': null,
  'ch.tocco.nice2.model.form.components.simple.DisplayExpressionFielxpressionFieldFacade': null,
  'ch.tocco.nice2.model.form.components.simple.MoneyAmountField': null,
  'ch.tocco.nice2.model.form.components.simple.PercentField': null,
  'ch.tocco.nice2.model.form.components.simple.DataAmountField': null,
  'ch.tocco.nice2.model.form.components.simple.CustomDataField': null,
  'ch.tocco.nice2.model.form.components.table.Table': null,
  'ch.tocco.nice2.model.form.components.table.Column': null,
  'ch.tocco.nice2.model.form.components.action.Action': null,
  'ch.tocco.nice2.model.form.components.action.ActionSeparator': null,
  'ch.tocco.nice2.model.form.components.Form': null,
  'ch.tocco.nice2.model.form.components.Template': null,
  'ch.tocco.nice2.model.form.components.layout.HorizontalBox': null,
  'ch.tocco.nice2.model.form.components.layout.VerticalBox': null,
  'ch.tocco.nice2.model.form.components.navigation.IteratorComponent': null,
  'ch.tocco.nice2.model.form.components.simple.DescriptionField': null,
  'ch.tocco.nice2.model.form.components.composite.LocationField': null,
  'ch.tocco.nice2.model.form.components.simple.LoginField': null
}

export default (formField, modelField, props, events, utils) => {
  const componentFactory = fromDefinitionTypeMap[formField.type]
  if (!componentFactory) return <span/>

  return componentFactory(formField, modelField, props, events, utils)
}
