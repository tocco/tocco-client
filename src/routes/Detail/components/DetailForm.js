import React from 'react'
import {reduxForm} from 'redux-form'
import HorizontalBox from '../../../components/HorizontalBox'
import VerticalBox from '../../../components/VerticalBox'
import LoadMask from '../../../components/LoadMask'
import { fetchEntity } from '../modules/detail'
import { visit, Visitor } from '../../../utils/formVisitor'

class FormBuilder extends Visitor {

  constructor(fields) {
    super()
    this.fields = fields
    this.stack = []
    this.form = null
  }

  enterForm(component) {
    this.stack.push([])
  }

  enterHorizontalBox(component) {
    this.stack.push([])
  }

  enterVerticalBox(component) {
    this.stack.push([])
  }

  leaveHorizontalBox(component) {
    const element = <HorizontalBox key={component.name} label={component.label}>{this.stack.pop()}</HorizontalBox>
    this.addChild(element)
  }

  leaveVerticalBox(component) {
    const element = <VerticalBox key={component.name} label={component.label}>{this.stack.pop()}</VerticalBox>
    this.addChild(element)
  }

  visitField(component) {
    const field = (<Field
      key={component.name}
      field={this.fields[component.name]}
      label={component.label}
    />)
    this.addChild(field)
  }

  addChild(child) {
    this.stack[this.stack.length - 1].push(child)
  }
}

const Field = props => (
  <div className="form-group">
    <label className="control-label col-sm-5">{props.label}:</label>
    <div className="col-sm-7">
      <p className="form-control-static">{typeof props.value !== 'object' ? (
        <input type="text" className="form-control" {...props.field}/>
      ) : null}</p>
    </div>
  </div>
)

class DetailForm extends React.Component {

  componentWillMount() {
    this.props.fetchEntity(this.props.entityModel, this.props.entityKey)
  }

  render() {
    const { layout, fields, entityModel, entityKey, handleSubmit, submitting } = this.props

    const builder = new FormBuilder(fields)
    visit(layout, builder)

    return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
        {builder.stack.pop()}
        <button type="submit" className="btn btn-default" disabled={submitting}>
          Speichern
        </button>
        {submitting ? <LoadMask/> : null}
      </form>
    )
  }
}

DetailForm.propTypes = {
  layout: React.PropTypes.object.isRequired,
  entityModel: React.PropTypes.string.isRequired,
  entityKey: React.PropTypes.string.isRequired,
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'detail'
},
state => { // mapStateToProps
  const values = {};

  const data = state.detail.data
  if (data) {
    Object.keys(data.fields).forEach(field => {
      values[field] = data.fields[field].value
    })
  }

  return {
    initialValues: values
  }
},
{  // mapDispatchToProps
  fetchEntity
}
)(DetailForm)
