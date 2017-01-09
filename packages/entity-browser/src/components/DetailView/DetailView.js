import React from 'react'
import {LayoutBox, EditableValue} from 'tocco-ui'
import './styles.scss'

const Field = props => {
  let value = {}
  let type = ''
  // temporary solution
  if (props.record.paths) {
    try {
      value = props.record.paths[props.field.name].value.value
      type = props.record.paths[props.field.name].value.type
    } catch (e) {
    }
  }
  return (
    <div className="form-group">
      <label className="control-label col-sm-5">{props.field.label}:</label>
      <div className="col-sm-7">
        <p className="form-control-static">
          <EditableValue type={type} value={value}/>
        </p>
      </div>
    </div>
  )
}

Field.propTypes = {
  field: React.PropTypes.object.isRequired,
  record: React.PropTypes.object
}

export const DetailView = props => {
  const formTraverser = children => {
    return children.map(child => {
      const layoutType = 'ch.tocco.nice2.model.form.components.layout.'
      if (child.type.indexOf(layoutType) === 0) {
        const layoutComponent = child.type.substr(layoutType.length, child.type.length)
        if (layoutComponent === 'HorizontalBox' || layoutComponent === 'VerticalBox') {
          const alignment = layoutComponent === 'HorizontalBox' ? 'horizontal' : 'vertical'
          const label = child.useLabel ? child.label : undefined
          return (
            <LayoutBox label={label} alignment={alignment}>
              {formTraverser(child.children)}
            </LayoutBox>
          )
        }
      }

      return <Field field={child} record={props.record}/>
    })
  }

  return (
    <div className="detail-view">
      <button onClick={props.closeRecordDetail}>Back</button>
      <h3>DetailView</h3>
      <span>{formTraverser(props.formDefinition.children)}</span>
    </div>
  )
}

DetailView.propTypes = {
  formDefinition: React.PropTypes.shape({
    children: React.PropTypes.array
  }).isRequired,
  closeRecordDetail: React.PropTypes.func.isRequired,
  record: React.PropTypes.object
}
