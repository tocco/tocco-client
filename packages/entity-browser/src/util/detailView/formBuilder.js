import React from 'react'
import {Field} from 'redux-form'
import {LayoutBox} from 'tocco-ui'
import _startsWith from 'lodash/startsWith'
import LabeledField from '../../components/DetailView/LabeledField'
import {getFieldId} from './helpers'
const layoutType = 'ch.tocco.nice2.model.form.components.layout.'
const selectTypes = ['entity', 'entity-list']
import _get from 'lodash/get'

export const getForm = (formDefinition, metaData) => {
  return formTraverser(formDefinition.children, metaData)
}

const formTraverser = (children, metaData) => {
  const result = []
  for (let i = 0; i < children.length; i++) {
    const child = children[i]

    if (_startsWith(child.type, layoutType)) {
      result.push(createLayoutComponent(child, metaData, i))
    } else {
      result.push(createField(child, metaData, i))
    }
  }

  return result
}

function createLayoutComponent(field, metaData, key) {
  const layoutComponent = field.type.substr(layoutType.length, field.type.length)
  if (layoutComponent === 'HorizontalBox' || layoutComponent === 'VerticalBox') {
    const alignment = layoutComponent === 'HorizontalBox' ? 'horizontal' : 'vertical'
    const label = field.useLabel ? field.label : undefined
    return (
      <LayoutBox key={key} label={label} alignment={alignment}>
        {formTraverser(field.children, metaData)}
      </LayoutBox>
    )
  }
}

const createField = (field, metaData, key) => {
  const {entity, entityModel, selectBoxStores, form, loadRelationEntities} = metaData
  const entityField = entity.paths[field.name]

  let fieldProps = {}

  if (selectTypes.includes(entityField.type)) {
    fieldProps.type = entityField.type === 'entity' ? 'single-select' : 'multi-select'
    const store = selectBoxStores[field.name] ? selectBoxStores[field.name].data : []
    fieldProps.options = {store}
  } else {
    fieldProps.type = entityField.value.type
  }

  const isMandatoryField = fieldName => _get(entityModel, `${fieldName}.validation.mandatory`, false)

  const handleFocus = (type, fieldName) => {
    if (selectTypes.includes(type)) {
      loadRelationEntities(fieldName)
    }
  }

  return (
    <div key={key} onFocus={() => (handleFocus(entityField.type, field.name))}>
      <Field
        id={getFieldId(form, field.name)}
        name={field.name}
        key={key}
        label={field.label}
        component={LabeledField}
        mandatory={isMandatoryField(field.name)}
        {...fieldProps}
      />
    </div>
  )
}

