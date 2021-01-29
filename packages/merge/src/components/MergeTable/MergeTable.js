import React, {useMemo} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Table, Typography, Button, LoadMask} from 'tocco-ui'
import {FormattedMessage, injectIntl} from 'react-intl'

import {getColumnDefinition, getDataRows} from '../../util/sourceData'
import sourceDataPropType from '../../util/sourceDataPropType'
import {setTargetEntity} from '../../modules/merge/actions'
import {CellRendererContainer} from './CellRender'
import MergeErrors, {mergeValidationErrorsPropTypes} from './MergeErrors'

const LabelCellRenderer = ({rowIdx, sourceData, allPaths}) => {
  const columnName = allPaths[rowIdx]
  return <Typography.B>{sourceData.labels[columnName]}</Typography.B>
}

LabelCellRenderer.propTypes = {
  rowIdx: PropTypes.number,
  sourceData: sourceDataPropType,
  allPaths: PropTypes.arrayOf(PropTypes.string)
}

const ColumnHeaderRenderer = ({label, entityKey, setTargetEntity, targetEntity, mergeStrategyDisplay}) => {
  const isChecked = targetEntity === entityKey
  const status = isChecked ? <FormattedMessage id="client.merge.strategy.keep"/> : mergeStrategyDisplay
  const onChange = () => setTargetEntity(entityKey)

  return <>
    <input type="radio" name="column" onChange={onChange} checked={isChecked} id={`targetEntity${entityKey}`}/>
    <Typography.Label for={`targetEntity${entityKey}`}> {label} ({status})</Typography.Label>
  </>
}

ColumnHeaderRenderer.propTypes = {
  label: PropTypes.string,
  entityKey: PropTypes.string.isRequired,
  setTargetEntity: PropTypes.func.isRequired,
  targetEntity: PropTypes.string,
  mergeStrategyDisplay: PropTypes.string.isRequired
}

const mapActionCreatorsColumn = {
  setTargetEntity
}
const mapStateToPropsColumn = (state, props) => ({
  targetEntity: state.merge.selected.targetEntity,
  mergeStrategyDisplay: state.merge.sourceData.mergeStrategyDisplay
})
const ColumnHeaderRendererContainer = connect(mapStateToPropsColumn,
  mapActionCreatorsColumn)(injectIntl(ColumnHeaderRenderer))

const MergeTable = ({sourceData, mergePending, mergeErrorMsg, mergeValidationErrors, executeMerge}) => {
  const data = useMemo(() =>
    sourceData ? getDataRows(sourceData) : []
  , [sourceData])

  const columns = useMemo(() =>
    sourceData
      ? getColumnDefinition(sourceData, ColumnHeaderRendererContainer, CellRendererContainer, LabelCellRenderer)
      : []
  , [sourceData])

  if (mergePending) {
    return <LoadMask/>
  }

  return <>
    <Button onClick={executeMerge} look="raised" ink="primary" disabled={sourceData === null}>
      <FormattedMessage id="client.merge.saveButton"/>
    </Button>
    <MergeErrors
      sourceData={sourceData}
      mergeErrorMsg={mergeErrorMsg}
      mergeValidationErrors={mergeValidationErrors}/>
    <Table
      columns={columns}
      data={data}
      selectionStyle="none"
      dataLoadingInProgress={sourceData === null}
      onColumnPositionChange={() => {
      }}
    />
  </>
}

MergeTable.propTypes = {
  sourceData: sourceDataPropType,
  mergePending: PropTypes.bool.isRequired,
  mergeErrorMsg: PropTypes.string,
  mergeValidationErrors: mergeValidationErrorsPropTypes,
  executeMerge: PropTypes.func.isRequired
}

export default MergeTable
