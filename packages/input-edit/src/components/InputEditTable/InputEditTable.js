import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import {EditableValue} from 'tocco-ui'
import {consoleLogger} from 'tocco-util'
import {formField} from 'tocco-app-extensions'

import {StyledCell, StyledHeader, StyledTable} from './StyledComponents'

const InputEditTable = ({data, inputDataForm, inputEditForm, updateValue, sorting, setSorting}) => {
  const dataFormCells = useMemo(() => getDataFormCells(inputDataForm), [inputDataForm])

  return <StyledTable onKeyDown={arrowKeyHandler}>
    <thead>
      <tr>
        {
          [...dataFormCells, ...inputEditForm].map(column =>
            <StyledHeader key={`${column.id}-header`}
              onClick={() => setSorting(column.id, getDirection(sorting, column.id))}>
              {column.label}
            </StyledHeader>
          )
        }
      </tr>
    </thead>
    <tbody>
      {
        Object.entries(data).map(([index, nodes]) =>
          <tr key={index}>
            <TableCells index={index}
              nodes={nodes}
              dataFormCells={dataFormCells}
              inputEditForm={inputEditForm}
              updateValue={updateValue}/>
          </tr>
        )
      }
    </tbody>
  </StyledTable>
}

const arrowKeyHandler = event => {
  if (document.activeElement.tagName === 'INPUT' && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
    event.preventDefault()
    const [idIndex, node] = document.activeElement.id.split(':')
    const currentIndex = Number.parseInt(idIndex)
    const indexDiff = event.key === 'ArrowUp' ? -1 : 1
    const idToFind = `${currentIndex + indexDiff}:${node}`
    const elementToFocus = document.getElementById(idToFind)
    if (elementToFocus) {
      elementToFocus.focus()
      elementToFocus.select()
    }
  }
}

const getDirection = ({field, direction}, newSortingField) => {
  if (field === newSortingField) {
    if (direction === 'asc') {
      return 'desc'
    } else {
      return 'asc'
    }
  } else {
    return 'asc'
  }
}

const getDataFormCells = inputDataForm => {
  if (Object.keys(inputDataForm).length === 0) {
    return []
  }

  const table = inputDataForm.children.find(child => child.componentType === 'table')
  if (Array.isArray(table.children)) {
    return table.children
  }

  consoleLogger.logError('InputEditTable did not receive the expected schema for the list form')
  return []
}

const keyBuilder = (index, column) => `${index}:${column.id}`

const TableCells = ({index, nodes, dataFormCells, inputEditForm, updateValue}) => {
  const dataCells = dataFormCells.map(column =>
    <DataCell key={keyBuilder(index, column)} index={index} nodes={nodes} column={column}/>
  )
  const editCells = inputEditForm.map(column =>
    <InputCell key={keyBuilder(index, column)} index={index} nodes={nodes} column={column} updateValue={updateValue}/>
  )
  return [...dataCells, ...editCells]
}

const DataCell = ({index, nodes, column}) => <td>
  {formField.formattedValueFactory(column.children[0].dataType)(
    column.children[0],
    undefined,
    'Input_edit_data_list',
    nodes[column.children[0].path],
    {},
    {},
    {},
    `${index}:${column.id}`
  )}
</td>

const InputCell = ({index, nodes, column, updateValue}) => {
  const width = column.dataType === 'single-select'
    ? Math.max(...(column.options.options.map(option => option.display.length))) * 8 + 60
    : undefined
  return <StyledCell width={width}>
    <EditableValue
      styles={{width: `${width}px`}}
      id={keyBuilder(index, column)}
      type={column.dataType}
      value={nodes[column.id]}
      readOnly={column.readonly}
      options={column.options}
      events={{
        onChange: changedValue => updateValue(nodes.pk, column.id, changedValue),
        onFocus: ({target}) => target.select()
      }}/>
  </StyledCell>
}

InputEditTable.propTypes = {
  data: PropTypes.object.isRequired,
  inputDataForm: PropTypes.shape({
    children: PropTypes.array
  }).isRequired,
  inputEditForm: PropTypes.array.isRequired,
  updateValue: PropTypes.func.isRequired,
  sorting: PropTypes.object,
  setSorting: PropTypes.func.isRequired
}

TableCells.propTypes = {
  index: PropTypes.string.isRequired,
  nodes: PropTypes.object.isRequired,
  dataFormCells: PropTypes.array.isRequired,
  inputEditForm: PropTypes.array.isRequired,
  updateValue: PropTypes.func.isRequired
}

DataCell.propTypes = {
  index: PropTypes.string.isRequired,
  nodes: PropTypes.object.isRequired,
  column: PropTypes.object.isRequired
}

InputCell.propTypes = {
  index: PropTypes.string.isRequired,
  nodes: PropTypes.object.isRequired,
  column: PropTypes.object.isRequired,
  updateValue: PropTypes.func.isRequired
}

export default InputEditTable
