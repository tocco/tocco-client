import React from 'react'
import validate from './syncValidation'
import DetailForm from './DetailForm'
import * as ToccoUi from 'tocco-ui'

import './styles.scss'

const DetailView = props => {
  return (
    <div className="detail-view">
      <ToccoUi.Button icon="glyphicon-chevron-left" onClick={props.closeEntityDetail} label="Back"/>
      <h3>DetailView</h3>

      <DetailForm
        validate={validate(props.entityModel)}
        submitForm={props.submitForm}
        formDefinition={props.formDefinition}
        entity={props.entity}
        loadRelationEntities={props.loadRelationEntities}
        selectBoxStores={props.selectBoxStores}
        a={props.syncErrors}
        formSyncErrors={props.formSyncErrors}
      />
    </div>
  )
}

export default DetailView

DetailView.propTypes = {
  syncErrors: React.PropTypes.object,
  submitForm: React.PropTypes.func.isRequired,
  closeEntityDetail: React.PropTypes.func.isRequired,
  formDefinition: React.PropTypes.shape({
    children: React.PropTypes.array
  }).isRequired,
  entityModel: React.PropTypes.object.isRequired,
  formSyncErrors: React.PropTypes.object,
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

