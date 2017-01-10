import React from 'react'
import DetailForm from './DetailForm'

import * as ToccoUi from 'tocco-ui'

const recordToInitialValues = record => {
  if (!record || !record.paths) return {}
  const result = {}
  const paths = record.paths
  Object.keys(record.paths).forEach(key => {
    if (paths[key].value !== null) {
      result[key] = paths[key].value.value
    }
  })
  return result
}

const formValuesToRecord = (values, record) => {
  Object.keys(values).forEach(key => {
    record.paths[key].value.value = values[key]
  })

  return record
}

const DetailView = props => {
  const handleSubmit = values => {
    props.saveRecord(formValuesToRecord(values, props.record))
  }

  return (
    <div className="detail-view">
      <ToccoUi.Button icon="glyphicon-chevron-left" onClick={props.closeRecordDetail} label="Back"/>
      <h3>DetailView</h3>
      <DetailForm
        onSubmit={handleSubmit}
        formDefinition={props.formDefinition}
        record={props.record}
        initialValues={recordToInitialValues(props.record)}
      />
    </div>
  )
}

DetailView.propTypes = {
  formDefinition: React.PropTypes.shape({
    children: React.PropTypes.array
  }).isRequired,
  closeRecordDetail: React.PropTypes.func.isRequired,
  record: React.PropTypes.object,
  saveRecord: React.PropTypes.func
}

export default DetailView

