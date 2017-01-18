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
        if (props.entity.paths[field.name].value !== null) {
          const type = props.entity.paths[field.name].value.type
          result.push(<Field name={field.name} type={type} key={i} label={field.label} component={LabeledField}/>)
        }
      }
    }

    return result
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

