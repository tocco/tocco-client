import React from 'react'
import LabeledField from './LabeledField'
import {Field, reduxForm} from 'redux-form'
import {Button, LayoutBox} from 'tocco-ui'

export const DetailForm = props => {
  if (!props.entity.paths) {
    return <div/>
  }

  const layoutType = 'ch.tocco.nice2.model.form.components.layout.'

  const formTraverser = children => {
    const result = []
    for (let i = 0; i < children.length; i++) {
      const field = children[i]

      if (field.type.indexOf(layoutType) === 0) {
        const layoutComponent = field.type.substr(layoutType.length, field.type.length)
        if (layoutComponent === 'HorizontalBox' || layoutComponent === 'VerticalBox') {
          const alignment = layoutComponent === 'HorizontalBox' ? 'horizontal' : 'vertical'
          const label = field.useLabel ? field.label : undefined
          result.push(
            <LayoutBox key={i} label={label} alignment={alignment}>
              {formTraverser(field.children)}
            </LayoutBox>
          )
        }
      } else {
        const entityField = props.entity.paths[field.name]
        const selectTypes = ['entity', 'entity-list']
        let fieldProps = {}
        if (entityField.type === 'field') {
          fieldProps.type = entityField.value.type
        } else if (selectTypes.includes(entityField.type) && props.selectBoxStores[field.name] !== undefined) {
          fieldProps.type = entityField.type === 'entity' ? 'single-select' : 'multi-select'
          const store = props.selectBoxStores[field.name].data
          fieldProps.options = {store}
        }

        const isMandatoryField = fieldName => (
          props.entityModel[fieldName]
          && props.entityModel[fieldName].validate
          && props.entityModel[fieldName].validate.mandatory
        )

        result.push(
          <div key={i} onFocus={() => props.loadRelationEntities(field.name)}>
            <Field
              name={field.name}
              key={i}
              label={field.label}
              component={LabeledField}
              mandatory={isMandatoryField(field.name)}
              {...fieldProps}
            />
          </div>)
      }
    }

    return result
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (props.valid) {
      props.submitForm()
    } else if (props.formSyncErrors) {
      Object.keys(props.formSyncErrors).forEach(f => props.touch(f))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {formTraverser(props.formDefinition.children)}
      <Button
        type="submit"
        label="Save"
        icon="glyphicon-floppy-save"
        pending={props.submitting}
        disabled={props.submitting}
        primary
      />
      <div>valid: {props.valid ? 'true' : 'false'}</div>
      <div>submitFailed: {props.submitFailed ? 'true' : 'false'}</div>
      <div>submitSucceeded: {props.submitSucceeded ? 'true' : 'false'}</div>
      <div>anyTouched: {props.anyTouched ? 'true' : 'false'}</div>
    </form>
  )
}

DetailForm.propTypes = {
  entityModel: React.PropTypes.object.isRequired,
  submitForm: React.PropTypes.func.isRequired,
  formDefinition: React.PropTypes.object.isRequired,
  entity: React.PropTypes.object.isRequired,
  submitting: React.PropTypes.bool,
  submitFailed: React.PropTypes.bool,
  submitSucceeded: React.PropTypes.bool,
  anyTouched: React.PropTypes.bool,
  loadRelationEntities: React.PropTypes.func,
  selectBoxStores: React.PropTypes.shape({
    entityName: React.PropTypes.shape({
      loaded: React.PropTypes.bool,
      data: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          value: React.PropTypes.string,
          label: React.PropTypes.string
        })
      )
    })
  }),
  formSyncErrors: React.PropTypes.objectOf(
    React.PropTypes.objectOf(React.PropTypes.string)
  ),
  valid: React.PropTypes.bool
}

export default reduxForm({
  form: 'detailForm',
  destroyOnUnmount: false
})(DetailForm)

