import PropTypes from 'prop-types'
import {useMemo} from 'react'
import {FormattedMessage} from 'react-intl'
import {Table, Typography, LoadMask} from 'tocco-ui'

import {getColumnDefinition, getDataRows} from '../../util/sourceData'
import sourceDataPropType from '../../util/sourceDataPropType'
import {StyledButton, StyledButtonWrapper} from '../GlobalStyledComponents'
import CellRendererContainer from './CellRenderContainer'
import ColumnHeaderRendererContainer from './ColumnHeaderRendererContainer'
import MergeErrors, {mergeValidationErrorsPropTypes} from './MergeErrors'
import {StyledTableWrapper} from './StyledComponents'

const LabelCellRenderer = ({rowIdx, sourceData, allPaths}) => {
  const columnName = allPaths[rowIdx]
  return <Typography.B>{sourceData.labels[columnName]}</Typography.B>
}

LabelCellRenderer.propTypes = {
  rowIdx: PropTypes.number,
  sourceData: sourceDataPropType,
  allPaths: PropTypes.arrayOf(PropTypes.string)
}

const MergeTable = ({sourceData, mergePending, mergeErrorMsg, mergeValidationErrors, executeMerge}) => {
  const data = useMemo(() => (sourceData ? getDataRows(sourceData) : []), [sourceData])

  const columns = useMemo(
    () =>
      sourceData
        ? getColumnDefinition(sourceData, ColumnHeaderRendererContainer, CellRendererContainer, LabelCellRenderer)
        : [],
    [sourceData]
  )

  if (mergePending) {
    return <LoadMask />
  }

  return (
    <>
      <StyledButtonWrapper>
        <StyledButton onClick={executeMerge} look="raised" ink="primary" disabled={sourceData === null}>
          <FormattedMessage id="client.merge.saveButton" />
        </StyledButton>
      </StyledButtonWrapper>
      <StyledTableWrapper>
        <MergeErrors
          sourceData={sourceData}
          mergeErrorMsg={mergeErrorMsg}
          mergeValidationErrors={mergeValidationErrors}
        />
        <Table
          columns={columns}
          data={data}
          selectionStyle="none"
          dataLoadingInProgress={sourceData === null}
          onColumnPositionChange={() => {}}
        />
      </StyledTableWrapper>
    </>
  )
}

MergeTable.propTypes = {
  sourceData: sourceDataPropType,
  mergePending: PropTypes.bool.isRequired,
  mergeErrorMsg: PropTypes.string,
  mergeValidationErrors: mergeValidationErrorsPropTypes,
  executeMerge: PropTypes.func.isRequired
}

export default MergeTable
