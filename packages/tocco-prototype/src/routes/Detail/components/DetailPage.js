import React from 'react'
import { Link } from 'react-router'
import DetailForm from './DetailForm'
import { visit, Visitor } from '../../../utils/formVisitor'


function getFields(form) {
  const fields = []
  visit(form, new class extends Visitor {
    visitField(component) {
      fields.push(component.name)
    }
  }())
  return fields
}

class DetailPage extends React.Component {

  componentWillMount() {
    this.props.fetchForm(this.props.formName)
  }

  render() {
    if (!this.props.forms[this.props.formName]) {
      return (
        <div className={classes.DetailPage}>
          <Link to="/">Zurück zur Übersicht</Link>
          <div>Daten werden geladen</div>
        </div>
      )
    }

    return (
      <div className={classes.DetailPage}>
        <Link to="/">Zurück zur Übersicht</Link>
        <DetailForm
          fields={getFields(this.props.forms[this.props.formName])}
          layout={this.props.forms[this.props.formName]}
          entityModel={this.props.entityModel}
          entityKey={this.props.entityKey}
          data={this.props.detail}
          onSubmit={this.props.updateEntity}
        />
      </div>
    )
  }
}

DetailPage.propTypes = {
  detail: React.PropTypes.object.isRequired,
  form: React.PropTypes.object.isRequired,
  entityModel: React.PropTypes.string.isRequired,
  entityKey: React.PropTypes.string.isRequired,
  formName: React.PropTypes.string.isRequired,
  updateEntity: React.PropTypes.func.isRequired,
  fetchForm: React.PropTypes.func.isRequired,
  forms: React.PropTypes.object.isRequired
}

export default DetailPage
