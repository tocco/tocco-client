import PropTypes from 'prop-types'
import {useState, useEffect, useMemo, useCallback} from 'react'
import {dragAndDrop} from 'tocco-util'

import Button from '../Button'
import SearchBox from '../SearchBox'
import Typography from '../Typography'
import {
  StyledColumnPickerWrapper,
  StyledControlsWrapper,
  StyledCheckbox,
  StyledUl,
  StyledButtonWrapper,
  StyledId,
  StyledItem,
  StyledNumber
} from './StyledColumnPicker'

const ColumnPicker = ({onOk, dndEnabled, initialColumns, intl, buttonLabel}) => {
  const [columns, setColumns] = useState([])
  const someUnchecked = columns.some(column => column.hidden)
  const initialColumnsSorted = initialColumns.sort((a, b) => a.hidden - b.hidden)
  useEffect(() => setColumns(initialColumnsSorted), [initialColumnsSorted])
  const [searchTerm, setSearchTerm] = useState(null)
  const changeColumnPosition = useCallback(
    (currentlyDragging, currentlyDragOver) => {
      if (currentlyDragging !== currentlyDragOver) {
        const currentlyDraggingItem = columns.find(c => c.id === currentlyDragging)
        setColumns(cols =>
          cols
            .filter(c => c !== currentlyDraggingItem)
            .reduce((acc, key) => [...acc, key, ...(key.id === currentlyDragOver ? [currentlyDraggingItem] : [])], [])
        )
      }
    },
    [columns]
  )
  const {dndEvents, dndState} = dragAndDrop.useDnD(changeColumnPosition)

  const listItems = useMemo(() => {
    const filteredColumns = columns.filter(
      column => searchTerm === null || column.label.match(new RegExp(searchTerm, 'i'))
    )

    return filteredColumns.map((column, idx) => {
      const isDraggedOver = dndState.currentlyDragOver === column.id && dndState.currentlyDragging !== column.id
      const handleChange = value => {
        setColumns(
          columns
            .map(c =>
              c.id === column.id
                ? {
                    ...c,
                    hidden: !value.target.checked
                  }
                : c
            )
            .sort((a, b) => a.hidden - b.hidden)
        )
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
            {column.label || <StyledId>{column.id}</StyledId>}
          </Typography.Label>
        </StyledItem>
      )
    })
  }, [searchTerm, columns, dndState, dndEnabled, dndEvents])

  const toggleAllCheckBoxes = e => {
    const isChecked = e.target.checked

    const toggledColumns = [
      ...columns.map(column => ({
        ...column,
        hidden: !isChecked
      }))
    ]

    setColumns(toggledColumns)
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
      <StyledButtonWrapper>
        <Button onClick={() => onOk(columns)} look={'raised'}>
          {buttonLabel || intl.formatMessage({id: 'client.entity-list.preferences.columns.okButton'})}
        </Button>
      </StyledButtonWrapper>
    </StyledColumnPickerWrapper>
  )
}

ColumnPicker.propTypes = {
  initialColumns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string,
      hidden: PropTypes.bool.isRequired
    })
  ).isRequired,
  onOk: PropTypes.func.isRequired,
  dndEnabled: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired,
  buttonLabel: PropTypes.string
}

export default ColumnPicker
