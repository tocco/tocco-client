import React from 'react'
import HorizontalBox from '../HorizontalBox'
import VerticalBox from '../VerticalBox'

const rootBox = form => form.children.find(child => child.name === 'box1')

const value = (data, name) => {
  const field = data.fields[name]
  if (field) {
    return field.value
  }
  return null
}

const Field = props => (
  <div className="form-group">
    <label className="control-label col-sm-5">{props.label}:</label>
    <div className="col-sm-7">
      <p className="form-control-static">{typeof props.value !== 'object' ? props.value : null}</p>
    </div>
  </div>
)

const component = (obj, data) => {
  if (obj.displayType === 'HIDDEN') {
    return null
  }

  const children = obj.children ? obj.children.map(child => component(child, data)) : []
  switch (obj.type) {
    case 'ch.tocco.nice2.model.form.components.layout.HorizontalBox':
      return <HorizontalBox key={obj.name} label={obj.label}>{children}</HorizontalBox>
    case 'ch.tocco.nice2.model.form.components.layout.VerticalBox':
      return <VerticalBox key={obj.name} label={obj.label}>{children}</VerticalBox>
    case 'ch.tocco.nice2.model.form.components.simple.NumberField':
    case 'ch.tocco.nice2.model.form.components.simple.TextField':
    case 'ch.tocco.nice2.model.form.components.simple.SingleSelectBox':
    case 'ch.tocco.nice2.model.form.components.simple.TextArea':
    case 'ch.tocco.nice2.model.form.components.simple.MultiSelectBox':
    case 'ch.tocco.nice2.model.form.components.simple.RemoteField':
    case 'ch.tocco.nice2.model.form.components.simple.MultiRemoteField':
    case 'ch.tocco.nice2.model.form.components.simple.DurationField':
    case 'ch.tocco.nice2.model.form.components.simple.DateField':
    case 'ch.tocco.nice2.model.form.components.simple.DatetimeField':
    case 'ch.tocco.nice2.model.form.components.simple.Checkbox':
    case 'ch.tocco.nice2.model.form.components.simple.MoneyAmountField':
    case 'ch.tocco.nice2.model.form.components.composite.LocationField':
    case 'ch.tocco.nice2.optional.geolocation.impl.gui.LongitudeField':
    case 'ch.tocco.nice2.optional.geolocation.impl.gui.LatitudeField':
    case 'ch.tocco.nice2.model.form.components.simple.DocumentField':
    case 'ch.tocco.nice2.model.form.components.simple.EmailField':
    case 'ch.tocco.nice2.model.form.components.simple.UrlField':
      return (
        <Field
          key={obj.name}
          name={obj.name}
          label={obj.label}
          value={value(data, obj.name)}
        />
      )
    default:
      throw Error('unknown type ' + obj.type)
  }
}

const DetailForm = props => {
  const box = rootBox(props.form)
  const components = component(box, props.data)

  return (
    <form className="form-horizontal">
      {components}
    </form>
  )
}

DetailForm.propTypes = {
  data: React.PropTypes.object.isRequired,
  form: React.PropTypes.object.isRequired,
}

export default DetailForm
