import React from 'react'
import * as ToccoUi from 'tocco-ui'
import DetailForm from './DetailForm'
import syncValidation from '../../util/syncValidation'
import {asyncValidate} from '../../util/reduxForms'

import './styles.scss'

class DetailView extends React.Component {
  constructor(props) {
    super(props)
    this.validate = syncValidation(props.entityModel)
  }

  render() {
    const props = this.props
    return (
      <div className="detail-view">
        <ToccoUi.Button icon="glyphicon-chevron-left" onClick={props.closeEntityDetail} label="Back"/>
        <h3>DetailView</h3>
        <DetailForm
          validate={this.validate}
          asyncValidate={asyncValidate}
          submitForm={props.submitForm}
          formDefinition={props.formDefinition}
          entity={props.entity}
          loadRelationEntities={props.loadRelationEntities}
          selectBoxStores={props.selectBoxStores}
          formSyncErrors={props.formSyncErrors}
          entityModel={props.entityModel}
        />
      </div>
    )
  }
}

export default DetailView

DetailView.propTypes = {
  submitForm: React.PropTypes.func.isRequired,
  closeEntityDetail: React.PropTypes.func.isRequired,
  formDefinition: React.PropTypes.shape({
    children: React.PropTypes.array
  }).isRequired,
  entityModel: React.PropTypes.object.isRequired,
  formSyncErrors: React.PropTypes.objectOf(
    React.PropTypes.objectOf(React.PropTypes.string)
  ),
  entity: React.PropTypes.object,
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
  })
}

