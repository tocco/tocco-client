import React from 'react'
import LabeledField from './LabeledField'
import {Field, reduxForm} from 'redux-form'
import * as ToccoUi from 'tocco-ui'
import {asyncValidate} from '../../util/reduxForms'

export const DetailForm = props => {
  if (!props.entity.paths) {
    return <div/>
  }

  console.log('PROPS', props)

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
        if (props.entity.paths[field.name].value !== null) {
          const type = props.entity.paths[field.name].value.type
          result.push(<Field name={field.name} type={type} key={i} label={field.label} component={LabeledField}/>)
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
      <div>submitFailed: {props.submitFailed.toString()}</div>
      <div>submitSucceeded: {props.submitSucceeded.toString()}</div>
      <div>anyTouched: {props.anyTouched.toString()}</div>
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

