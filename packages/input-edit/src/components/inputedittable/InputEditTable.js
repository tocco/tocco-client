import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {EditableValue} from 'tocco-ui'
import {consoleLogger} from 'tocco-util'
import {formField} from 'tocco-app-extensions'

import {StyledCell, StyledHeader, StyledTable} from './StyledComponents'

const InputEditTable = ({data, inputDataForm, inputEditForm, updateValue, sorting, setSorting}) => {
  const dataFormCells = getDataFormCells(inputDataForm)

  useEffect(() => {
    const handler = arrowKeyHandler(Object.keys(data).length)
    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [data])

  return <StyledTable>
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

const arrowKeyHandler = listSize => event => {
  if (document.activeElement.tagName === 'INPUT' && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
    const [idIndex, node] = document.activeElement.id.split(':')
    const index = Number.parseInt(idIndex)
    event.preventDefault()
    const elementToFocus = getElementToFocus(index, node, listSize, event.key)
    if (elementToFocus) {
      elementToFocus.focus()
      elementToFocus.select()
    }
  }
}

const getElementToFocus = (index, node, listSize, key) => {
  if (key === 'ArrowUp' && index > 0) {
    return document.getElementById(`${index - 1}:${node}`)
  } else if (key === 'ArrowDown' && index < listSize - 1) {
    return document.getElementById(`${index + 1}:${node}`)
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

const DataCell = ({index, nodes, column}) => {
  const field = column.children[0]
  return <td>
    {formField.formattedValueFactory(field.dataType)(
      field, undefined, 'Input_edit_data_list', nodes[field.path], {}, {}, {}, `${index}:${column.id}`
    )}
  </td>
}

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
