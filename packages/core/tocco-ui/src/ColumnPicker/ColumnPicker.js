import PropTypes from 'prop-types'
import React, {useState, useEffect, useMemo, useCallback} from 'react'
import {dragAndDrop} from 'tocco-util'

import Button from '../Button'
import SearchBox from '../SearchBox'
import Typography from '../Typography'
import {StyledCheckbox, StyledUl, StyledButtonWrapper, StyledId, StyledItem} from './StyledColumnPicker'

const ColumnPicker = ({onOk, dndEnabled, initialColumns, intl, buttonLabel}) => {
  const [columns, setColumns] = useState([])
  useEffect(() => setColumns(initialColumns), [initialColumns])
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

  const items = useMemo(
    () =>
      columns
        .filter(column => searchTerm === null || column.label.match(new RegExp(searchTerm, 'i')))
        .map(column => (
          <StyledItem
            key={column.id}
            draggable={dndEnabled}
            isDraggedOver={dndState.currentlyDragOver === column.id && dndState.currentlyDragging !== column.id}
            {...(dndEnabled && {...dndEvents(column.id)})}
          >
            <StyledCheckbox
              type={'checkbox'}
              id={column.id}
              checked={!column.hidden}
              onChange={value =>
                setColumns(
                  columns.map(c =>
                    c.id === column.id
                      ? {
                          ...c,
                          hidden: !value.target.checked
                        }
                      : c
                  )
                )
              }
            />
            <Typography.Label for={column.id}>{column.label || <StyledId>{column.id}</StyledId>}</Typography.Label>
          </StyledItem>
        )),
    [searchTerm, columns, dndState, dndEnabled, dndEvents]
  )

  return (
    <div>
      <SearchBox
        placeholder={intl.formatMessage({id: 'client.entity-list.preferences.columns.search'})}
        onSearch={setSearchTerm}
      />
      <StyledUl>{items}</StyledUl>
      <StyledButtonWrapper>
        <Button onClick={() => onOk(columns)} look={'raised'}>
          {buttonLabel || intl.formatMessage({id: 'client.entity-list.preferences.columns.okButton'})}
        </Button>
      </StyledButtonWrapper>
    </div>
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
