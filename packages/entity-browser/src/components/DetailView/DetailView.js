import React from 'react'
import DetailForm from './DetailForm'
import * as ToccoUi from 'tocco-ui'
import {formValuesToEntity, entityToFormValues} from '../../util/forms'
import {submitValidate} from './validate'

import './styles.scss'

const DetailView = props => {
  const handleSubmit = values => {
    return submitValidate(values, true).then(() => {
      props.saveEntity(formValuesToEntity(values, props.entity))
    })
  }

  return (
    <div className="detail-view">
      <ToccoUi.Button icon="glyphicon-chevron-left" onClick={props.closeEntityDetail} label="Back"/>
      <h3>DetailView</h3>
      <DetailForm
        onSubmit={handleSubmit}
        formDefinition={props.formDefinition}
        entity={props.entity}
        initialValues={entityToFormValues(props.entity)}
      />
    </div>
  )
}

DetailView.propTypes = {
  formDefinition: React.PropTypes.shape({
    children: React.PropTypes.array
  }).isRequired,
  closeEntityDetail: React.PropTypes.func.isRequired,
  entity: React.PropTypes.object,
  saveEntity: React.PropTypes.func
}

export default DetailView

