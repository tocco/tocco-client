import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import {EditableValue, FormattedValue} from 'tocco-ui'
import {consoleLogger} from 'tocco-util'
import {field} from 'tocco-app-extensions'
import _get from 'lodash/get'

import {
  StyledCell,
  StyledHeader,
  StyledTable,
  StyledTableRow,
  StyledTableWrapper
} from './StyledComponents'
import loadValue from './PathResolver'

const InputEditTable = ({data, inputDataForm, inputEditForm, updateValue, sorting, setSorting}) => {
  const dataFormCells = useMemo(() => getDataFormCells(inputDataForm), [inputDataForm])

  return <StyledTableWrapper>
    <StyledTable onKeyDown={arrowKeyHandler}>
      <thead>
        <StyledTableRow>
          {
            [...dataFormCells, ...inputEditForm].map(column =>
              <StyledHeader key={`${column.id}-header`}
                onClick={() => setSorting(column.id, getDirection(sorting, column.id))}>
                {column.label}
              </StyledHeader>
            )
          }
        </StyledTableRow>
      </thead>
      <tbody>
        {
          data.map((nodes, index) =>
            <StyledTableRow key={index}>
              <TableCells index={index}
                nodes={nodes}
                dataFormCells={dataFormCells}
                inputEditForm={inputEditForm}
                updateValue={updateValue}/>
            </StyledTableRow>
          )
        }
      </tbody>
    </StyledTable>
  </StyledTableWrapper>
}

const arrowKeyHandler = event => {
  if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)
    && ['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp'].includes(event.key)) {
    event.preventDefault()
    const [rowIndex, columnIndex] = document.activeElement.id.split(':')
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      const currentIndex = Number.parseInt(rowIndex)
      const indexDiff = event.key === 'ArrowUp' ? -1 : 1
      const idToFocus = `${currentIndex + indexDiff}:${columnIndex}`
      const elementToFocus = document.getElementById(idToFocus)
      focusElement(elementToFocus)
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      const currentIndex = Number.parseInt(columnIndex)
      const indexDiff = event.key === 'ArrowLeft' ? -1 : 1
      const elementToFocus = findHorizontalElementToFocus(rowIndex, currentIndex, indexDiff)
      focusElement(elementToFocus)
    }
  }
}

/**
 * there might be readonly fields mixed in, so we need to check the rest of the fields
 * @param rowIndex which row to navigate in
 * @param currentIndex last checked cell index
 * @param indexDiff which direction to move in
 * @returns {HTMLElement}
 */
const findHorizontalElementToFocus = (rowIndex, currentIndex, indexDiff) => {
  const adjustedIndex = currentIndex + indexDiff
  const idToFocus = `${rowIndex}:${adjustedIndex}`
  const elementToFocus = document.getElementById(idToFocus)
  if (elementToFocus) {
    if (['INPUT', 'TEXTAREA'].includes(elementToFocus.tagName) && !elementToFocus.disabled) {
      return elementToFocus
    } else {
      return findHorizontalElementToFocus(rowIndex, adjustedIndex, indexDiff)
    }
  } else {
    return elementToFocus
  }
}

const focusElement = elementToFocus => {
  if (elementToFocus) {
    // Reacts NumberFormat is clingy and steals focus when using left and right arrow keys, so we steal it back
    setTimeout(() => {
      elementToFocus.focus()
    }, 0)
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

const keyBuilder = (row, column) => `${row}:${column}`

const TableCells = ({index, nodes, dataFormCells, inputEditForm, updateValue}) => {
  const dataCells = dataFormCells.map(column =>
    <DataCell key={keyBuilder(index, column.id)} index={index} nodes={nodes} column={column}/>
  )
  const editCells = inputEditForm.map((column, columnIndex) => {
    const key = keyBuilder(index, columnIndex)
    return <InputCell key={key} id={key} nodes={nodes} column={column} updateValue={updateValue}/>
  })
  return [...dataCells, ...editCells]
}

const DataCell = ({nodes, column}) => {
  const Field = field.factory('list', column.children[0].dataType)
  const value = loadValue(nodes, column)
  return <StyledCell>
    <Field
      formField={column.children[0]}
      formName="Input_edit_data_list"
      value={value}
    />
  </StyledCell>
}

const InputCell = ({id, nodes, column, updateValue}) => {
  const width = column.dataType === 'single-select'
    ? Math.max(...(column.options.options.map(option => option.display.length))) * 8 + 60
    : null
  const data = _get(nodes, column.id.replace('.', '.value.paths.'))
  return <StyledCell width={width} className={column.dataType}>
    {
      column.readonly
        ? <FormattedValue
          id={id}
          type={column.dataType}
          value={data ? (Object.prototype.hasOwnProperty.call(data, 'value') ? data.value : data) : null}
          options={column.options}
        />
        : <EditableValue
          styles={{width: `${width}px`}}
          id={id}
          type={column.dataType}
          value={data ? (Object.prototype.hasOwnProperty.call(data, 'value') ? data.value : data) : null}
          readOnly={column.readonly}
          options={column.options}
          events={{
            onChange: changedValue => updateValue(nodes.pk.value, column.id, changedValue),
            onFocus: ({target}) => target.select()
          }}
        />
    }
  </StyledCell>
}

InputEditTable.propTypes = {
  data: PropTypes.array.isRequired,
  inputDataForm: PropTypes.shape({
    children: PropTypes.array
  }).isRequired,
  inputEditForm: PropTypes.array.isRequired,
  updateValue: PropTypes.func.isRequired,
  sorting: PropTypes.object,
  setSorting: PropTypes.func.isRequired
}

TableCells.propTypes = {
  index: PropTypes.number.isRequired,
  nodes: PropTypes.object.isRequired,
  dataFormCells: PropTypes.array.isRequired,
  inputEditForm: PropTypes.array.isRequired,
  updateValue: PropTypes.func.isRequired
}

DataCell.propTypes = {
  index: PropTypes.number.isRequired,
  nodes: PropTypes.object.isRequired,
  column: PropTypes.object.isRequired
}

InputCell.propTypes = {
  id: PropTypes.string.isRequired,
  nodes: PropTypes.object.isRequired,
  column: PropTypes.object.isRequired,
  updateValue: PropTypes.func.isRequired
}

export default InputEditTable
