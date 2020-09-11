import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Table, EditableValue, FormattedValue} from 'tocco-ui'
import {api} from 'tocco-util'
import {field} from 'tocco-app-extensions'

import {
  StyledCell,
  StyledTableWrapper
} from './StyledComponents'
import {arrowKeyHandler} from './keyHandler'

const dataCellRenderer = (fieldDefinition, data) => {
  const {path, dataType} = fieldDefinition
  const Field = field.factory('list', dataType)
  const value = data[path]

  return <StyledCell key={path}>
    <Field
      type={dataType}
      formField={fieldDefinition}
      modelField={{}}
      value={value}
      breakWords={false}
    />
  </StyledCell>
}

const keyBuilder = (row, column) => `${row}:${column}`

const inputCellRenderer = (fieldDefinition, data, updateValue, rowIdx) => {
  const {readonly, id, dataType, options} = fieldDefinition.definition

  const pk = data.pk
  const value = data[id]

  if (readonly) {
    return <StyledCell key={id}>
      <FormattedValue
        id={id}
        type={dataType}
        value={value}
        options={options}
      />
    </StyledCell>
  } else {
    return <StyledCell key={id}>
      <EditableValue
        id={keyBuilder(rowIdx, fieldDefinition.idx)}
        type={dataType}
        value={value}
        options={options}
        events={{
          onChange: changedValue => {
            updateValue(pk, id, changedValue)
          },
          onFocus: ({target}) => target.select()
        }}
      />
    </StyledCell>
  }
}

const InputEditTable = ({
  data,
  dataFormColumns,
  inputEditForm,
  updateValue,
  sorting,
  setSorting,
  dataLoadingInProgress,
  totalCount,
  currentPage,
  recordsPerPage,
  setCurrentPage
}) => {
  const [columns, setColumns] = useState([])
  const [columnPosition, setColumnPosition] = useState([])

  useEffect(() => {
    const dataColumns = api.getColumnDefinition(dataFormColumns, sorting, dataCellRenderer)

    const inputColumns = inputEditForm.map((c, idx) => ({
      idx: idx,
      id: c.id,
      label: c.label,
      sorting: {
        sortable: false
      },
      definition: c,
      resizable: true,
      dynamic: true,
      CellRenderer: ({rowData, column, rowIdx}) => inputCellRenderer(column, rowData, updateValue, rowIdx)
    }))

    const cc = [...dataColumns, ...inputColumns].sort((a, b) =>
      columnPosition.findIndex(e => e === a.id) - columnPosition.findIndex(e => e === b.id)
    )
    setColumns(cc)
  }, [columnPosition, dataFormColumns, inputEditForm, sorting])

  const onColumnPositionChange = (column, newPositionColumn, columns) => {
    setColumnPosition(columns.reduce((acc, c) => {
      return [
        ...acc,
        ...(c.id === newPositionColumn ? [
          c.id, column
        ] : []),
        ...(c.id === column ? [] : [c.id])
      ]
    }, []))
  }

  return <StyledTableWrapper onKeyDown={arrowKeyHandler}>
    <Table
      dataLoadingInProgress={dataLoadingInProgress}
      columns={columns}
      data={data}
      onSortingChange={setSorting}
      onColumnPositionChange={onColumnPositionChange}
      paginationInfo={{
        currentPage,
        recordsPerPage,
        totalCount
      }}
      onPageChange={setCurrentPage}
    />
  </StyledTableWrapper>
}

InputEditTable.propTypes = {
  data: PropTypes.array.isRequired,
  dataFormColumns: PropTypes.arrayOf(
    PropTypes.shape({id: PropTypes.string})
  ),
  sorting: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string,
    order: PropTypes.string
  })),
  inputEditForm: PropTypes.array.isRequired,
  updateValue: PropTypes.func.isRequired,
  setSorting: PropTypes.func.isRequired,
  dataLoadingInProgress: PropTypes.bool,
  totalCount: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
  recordsPerPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired
}

export default InputEditTable
