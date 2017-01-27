import React from 'react'
import DetailForm from './DetailForm'
import * as ToccoUi from 'tocco-ui'

import './styles.scss'

const DetailView = props => {
  return (
    <div className="detail-view">
      <ToccoUi.Button icon="glyphicon-chevron-left" onClick={props.closeEntityDetail} label="Back"/>
      <h3>DetailView</h3>
      <DetailForm
        submitForm={props.submitForm}
        formDefinition={props.formDefinition}
        entity={props.entity}
        loadRelationEntities={props.loadRelationEntities}
        selectBoxStores={props.selectBoxStores}
      />
    </div>
  )
}

export default DetailView

DetailView.propTypes = {
  submitForm: React.PropTypes.func.isRequired,
  closeEntityDetail: React.PropTypes.func.isRequired,
  formDefinition: React.PropTypes.shape({
    children: React.PropTypes.array
  }).isRequired,
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

