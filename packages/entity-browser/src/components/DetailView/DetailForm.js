import React from 'react'
import LabeledField from './LabeledField'
import {Field, reduxForm} from 'redux-form'
import * as ToccoUi from 'tocco-ui'
import {asyncValidate} from './validate'

const DetailForm = props => {
  if (!props.entity.paths) {
    return <div/>
  }

  const formTraverser = children => {
    return children.map((field, idx) => {
      const layoutType = 'ch.tocco.nice2.model.form.components.layout.'
      if (field.type.indexOf(layoutType) === 0) {
        const layoutComponent = field.type.substr(layoutType.length, field.type.length)
        if (layoutComponent === 'HorizontalBox' || layoutComponent === 'VerticalBox') {
          const alignment = layoutComponent === 'HorizontalBox' ? 'horizontal' : 'vertical'
          const label = field.useLabel ? field.label : undefined
          return (
            <ToccoUi.LayoutBox key={idx} label={label} alignment={alignment}>
              {formTraverser(field.children)}
            </ToccoUi.LayoutBox>
          )
        }
      }

      if (props.entity.paths[field.name].value !== null) {
        const type = props.entity.paths[field.name].value.type
        return <Field name={field.name} type={type} key={idx} label={field.label} component={LabeledField}/>
      }

      return <span/>
    })
  }

  return (
    <form onSubmit={props.handleSubmit}>
      {formTraverser(props.formDefinition.children)}
      <ToccoUi.Button type="submit" label="Save" icon="glyphicon-floppy-save" disabled={props.submitting} primary/>
    </form>
  )
}

DetailForm.propTypes = {
  handleSubmit: React.PropTypes.func,
  submitting: React.PropTypes.bool,
  formDefinition: React.PropTypes.object,
  entity: React.PropTypes.object
}

export default reduxForm({
  form: 'detailForm',
  destroyOnUnmount: false,
  enableReinitialize: true,
  asyncValidate
})(DetailForm)
