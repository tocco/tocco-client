import PropTypes from 'prop-types'
import {useState, useMemo, useCallback} from 'react'
import {dragAndDrop, html} from 'tocco-util'

import SearchBox from '../SearchBox'
import Typography from '../Typography'
import {
  StyledColumnPickerWrapper,
  StyledControlsWrapper,
  StyledCheckbox,
  StyledUl,
  StyledId,
  StyledItem,
  StyledNumber
} from './StyledColumnPicker'

const sortColumns = (columns, sortCriteria = 'hidden') => columns.sort((a, b) => a[sortCriteria] - b[sortCriteria])
const getFilteredColumns = (columns, searchTerm) =>
  columns.filter(column => searchTerm === null || column.label.match(new RegExp(searchTerm, 'i')))

const ColumnPicker = ({dndEnabled, columns: unsortedColumns = [], onColumnsChange, intl}) => {
  const columns = sortColumns(unsortedColumns)

  const [searchTerm, setSearchTerm] = useState(null)
  const changeColumnPosition = useCallback(
    (currentlyDragging, currentlyDragOver) => {
      if (currentlyDragging !== currentlyDragOver) {
        const currentlyDraggingItem = columns.find(c => c.id === currentlyDragging)
        const updateColumns = prevColumns =>
          prevColumns
            .filter(c => c !== currentlyDraggingItem)
            .reduce((acc, key) => [...acc, key, ...(key.id === currentlyDragOver ? [currentlyDraggingItem] : [])], [])

        onColumnsChange(updateColumns)
      }
    },
    [columns, onColumnsChange]
  )
  const {dndEvents, dndState} = dragAndDrop.useDnD(changeColumnPosition)

  const filteredColumns = useMemo(() => getFilteredColumns(columns, searchTerm), [columns, searchTerm])
  const someUnchecked = filteredColumns.some(column => column.hidden)

  const listItems = useMemo(
    () =>
      filteredColumns.map((column, idx) => {
        const isDraggedOver = dndState.currentlyDragOver === column.id && dndState.currentlyDragging !== column.id

        const handleChange = value => {
          const updateColumns = prevColumns =>
            sortColumns(
              prevColumns.map(c =>
                c.id === column.id
                  ? {
                      ...c,
                      hidden: !value.target.checked
                    }
                  : c
              )
            )

          onColumnsChange(updateColumns)
        }

        return (
          <StyledItem
            key={column.id}
            draggable={dndEnabled}
            isDraggedOver={isDraggedOver}
            {...(dndEnabled && {...dndEvents(column.id)})}
          >
            <StyledCheckbox type={'checkbox'} id={column.id} checked={!column.hidden} onChange={handleChange} />
            <Typography.Label for={column.id}>
              <StyledNumber>{idx + 1}.</StyledNumber>
              {column.label ? (
                <span dangerouslySetInnerHTML={{__html: html.sanitizeHtml(column.label)}} />
              ) : (
                <StyledId>{column.id}</StyledId>
              )}
            </Typography.Label>
          </StyledItem>
        )
      }),
    [dndState, dndEnabled, dndEvents, filteredColumns, onColumnsChange]
  )

  const toggleAllCheckBoxes = e => {
    const isChecked = e.target.checked

    const updateColumns = prevColumns => {
      const prevFilteredColumns = getFilteredColumns(prevColumns, searchTerm)

      return sortColumns([
        ...prevColumns.map(column => ({
          ...column,
          hidden: prevFilteredColumns.includes(column) ? !isChecked : column.hidden
        }))
      ])
    }

    onColumnsChange(updateColumns)
  }

  return (
    <StyledColumnPickerWrapper>
      <SearchBox
        placeholder={intl.formatMessage({id: 'client.entity-list.preferences.columns.search'})}
        onSearch={setSearchTerm}
      />
      <StyledControlsWrapper>
        <StyledCheckbox type={'checkbox'} onChange={toggleAllCheckBoxes} checked={!someUnchecked} />
        <Typography.Span>
          {intl.formatMessage({id: 'client.entity-list.preferences.columns.selectDeselectAllCheckbox'})}
        </Typography.Span>
      </StyledControlsWrapper>
      <StyledUl>{listItems}</StyledUl>
    </StyledColumnPickerWrapper>
  )
}

ColumnPicker.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string,
      hidden: PropTypes.bool.isRequired
    })
  ).isRequired,
  onColumnsChange: PropTypes.func.isRequired,
  dndEnabled: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired
}

export default ColumnPicker
