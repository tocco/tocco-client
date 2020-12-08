import React, {useMemo} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Table, Typography, Button} from 'tocco-ui'
import {FormattedMessage, injectIntl} from 'react-intl'

import {getColumnDefinition, getDataRows} from '../../util/sourceData'
import sourceDataPropType from '../../util/sourceDataPropType'
import {setTargetEntity} from '../../modules/merge/actions'
import {CellRendererContainer} from './CellRender'

const LabelCellRenderer = ({rowIdx, sourceData, allPaths}) => {
  const columnName = allPaths[rowIdx]
  return <Typography.B>{sourceData.labels[columnName]}</Typography.B>
}

LabelCellRenderer.propTypes = {
  rowIdx: PropTypes.number,
  sourceData: sourceDataPropType,
  allPaths: PropTypes.arrayOf(PropTypes.string)
}

const ColumnHeaderRenderer = ({label, entityKey, setTargetEntity, targetEntity}) => {
  const isChecked = targetEntity === entityKey
  const onChange = () => setTargetEntity(entityKey)

  return <><input type="radio" name="column" onChange={onChange} checked={isChecked}/> {label}</>
}

ColumnHeaderRenderer.propTypes = {
  label: PropTypes.string,
  entityKey: PropTypes.string.isRequired,
  setTargetEntity: PropTypes.func.isRequired,
  targetEntity: PropTypes.string
}

const mapActionCreatorsColumn = {
  setTargetEntity
}
const mapStateToPropsColumn = (state, props) => ({
  targetEntity: state.merge.selected.targetEntity
})
const ColumnHeaderRendererContainer = connect(mapStateToPropsColumn,
  mapActionCreatorsColumn)(injectIntl(ColumnHeaderRenderer))

const MergeTable = ({sourceData, executeMerge}) => {
  const data = useMemo(() =>
    sourceData ? getDataRows(sourceData) : []
  , [sourceData])

  const columns = useMemo(() => {
    if (sourceData) {
      return getColumnDefinition(sourceData, ColumnHeaderRendererContainer, CellRendererContainer, LabelCellRenderer)
    } else {
      return []
    }
  }, [sourceData])

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
