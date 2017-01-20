import React from 'react'
import LabeledField from './LabeledField'
import {Field, reduxForm} from 'redux-form'
import * as ToccoUi from 'tocco-ui'
import {asyncValidate} from '../../util/reduxForms'

export const DetailForm = props => {
  if (!props.entity.paths) {
    return <div/>
  }

  const layoutType = 'ch.tocco.nice2.model.form.components.layout.'

  const formTraverser = children => {
    const result = []
    for (let i = 0; i < children.length; i++) {
      const field = children[i]

      if (children[i].type.indexOf(layoutType) === 0) {
        const layoutComponent = field.type.substr(layoutType.length, field.type.length)
        if (layoutComponent === 'HorizontalBox' || layoutComponent === 'VerticalBox') {
          const alignment = layoutComponent === 'HorizontalBox' ? 'horizontal' : 'vertical'
          const label = field.useLabel ? field.label : undefined
          result.push(
            <ToccoUi.LayoutBox key={i} label={label} alignment={alignment}>
              {formTraverser(field.children)}
            </ToccoUi.LayoutBox>
          )
        }
      } else {
        const fieldProperties = props.entity.paths[field.name]
        if (fieldProperties && fieldProperties.value != null) {
          if (fieldProperties.type === 'field') {
            const type = props.entity.paths[field.name].value.type
            result.push(<Field name={field.name} type={type} key={i} label={field.label} component={LabeledField}/>)
          } else if (fieldProperties.type === 'entity') {
            const v = fieldProperties.value.key
            result.push(<Field name={field.name} type="single-select" key={i} label={field.label}
              component={LabeledField} options={{store: [{value: v, label: fieldProperties.value.display}]}}/>)
          } else if (fieldProperties.type === 'entity-list') {
            const values = fieldProperties.value
            const possibleValues = values.map(e => {
              return {value: e.key, label: e.display}
            })
            result.push(<Field name={field.name} type="multi-select" key={i} label={field.label}
              component={LabeledField} options={{possibleValues: possibleValues}}/>)
          }
        }
      }
    }

    return result
  }

  const handleSubmit = e => {
    props.submitForm()
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      {formTraverser(props.formDefinition.children)}
      <ToccoUi.Button
        type="submit"
        label="Save"
        icon="glyphicon-floppy-save"
        pending={props.submitting}
        disabled={props.submitting}
        primary
      />
      <div>submitFailed: {props.submitFailed && props.submitFailed.toString()}</div>
      <div>submitSucceeded: {props.submitSucceeded && props.submitSucceeded.toString()}</div>
      <div>anyTouched: {props.anyTouched && props.anyTouched.toString()}</div>
    </form>
  )
}

DetailForm.propTypes = {
  submitForm: React.PropTypes.func.isRequired,
  formDefinition: React.PropTypes.object.isRequired,
  entity: React.PropTypes.object.isRequired,
  submitting: React.PropTypes.bool,
  submitFailed: React.PropTypes.bool,
  submitSucceeded: React.PropTypes.bool,
  anyTouched: React.PropTypes.bool
}

export default reduxForm({
  form: 'detailForm',
  destroyOnUnmount: false,
  asyncValidate
})(DetailForm)

