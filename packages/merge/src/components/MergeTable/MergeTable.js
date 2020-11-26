import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import {Table, FormattedValue, Typography, Button} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'

import {getColumnDefinition, getDataRows} from '../../util/sourceData'
import sourceDataPropType from '../../util/sourceDataPropType'

const ManyRelationsCheckBox = ({entityData}) => <>
  <input type="checkbox"/>
  <Typography.Span><FormattedMessage id="client.merge.allRelations"/> ({entityData.value.length})</Typography.Span>
</>

ManyRelationsCheckBox.propTypes = {
  entityData: PropTypes.shape({
    value: PropTypes.arrayOf(PropTypes.string)
  })
}

const RelationsCheckBoxes = ({entityData}) => {
  return entityData.value.map(value =>
    <div key={`relation-checkbox-${value.key}`}>
      <input type="checkbox"/>
      <FormattedValue type="single-select" value={value}/>
    </div>
  )
}

RelationsCheckBoxes.propTypes = {
  entityData: PropTypes.shape({
    value: PropTypes.array
  })
}

const FormattedValueRadio = ({entityData}) => {
  const typeMapper = {
    entity: 'single-select'
  }

  const {type} = entityData
  const mappedType = typeMapper[type] || type

  if (!entityData.value) {
    return null
  }

  return <>
    <input type="radio"/>
    <FormattedValue type={mappedType} value={entityData.value}/>
  </>
}

FormattedValueRadio.propTypes = {
  entityData: PropTypes.shape({
    value: PropTypes.any,
    type: PropTypes.string
  })
}

const CellRenderer = ({rowData, column}) => {
  const {entityKey} = column
  const entityData = rowData[entityKey]

  const {type} = entityData

  if (type === 'relations') {
    return <ManyRelationsCheckBox entityData={entityData}/>
  }

  if (type === 'entity-list') {
    return <RelationsCheckBoxes entityData={entityData}/>
  }

  return <FormattedValueRadio entityData={entityData}/>
}

CellRenderer.propTypes = {
  rowData: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.shape({
    value: PropTypes.any,
    type: PropTypes.string
  }), PropTypes.string])),
  column: PropTypes.shape({
    entityKey: PropTypes.string.isRequired
  })
}

const LabelCellRenderer = ({rowIdx, sourceData, allPaths}) => {
  const columnName = allPaths[rowIdx]
  return <Typography.B>{sourceData.labels[columnName]}</Typography.B>
}

LabelCellRenderer.propTypes = {
  rowIdx: PropTypes.number,
  sourceData: sourceDataPropType,
  allPaths: PropTypes.arrayOf(PropTypes.string)
}

const MergeTable = ({sourceData, executeMerge}) => {
  const data = useMemo(() =>
    sourceData ? getDataRows(sourceData) : []
  , [sourceData])

  const columns = useMemo(() =>
    sourceData ? getColumnDefinition(sourceData, CellRenderer, LabelCellRenderer) : []
  , [sourceData])

  return (
    <>
      <Button onClick={executeMerge} look="raised" ink="primary">
        <FormattedMessage id="client.merge.saveButton"/>
      </Button>
      <Table
        columns={columns}
        data={data}
        selectionStyle="none"
        dataLoadingInProgress={sourceData === null}
        onColumnPositionChange={() => {
        }}
      />
    </>
  )
}

MergeTable.propTypes = {
  sourceData: sourceDataPropType,
  executeMerge: PropTypes.func.isRequired
}

export default MergeTable
