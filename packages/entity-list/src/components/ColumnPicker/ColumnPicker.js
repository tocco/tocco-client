import PropTypes from 'prop-types'
import React, {useState, useMemo} from 'react'
import {useDnD} from 'tocco-util'
import {Button, SearchBox, Typography} from 'tocco-ui'

import {
  StyledCheckbox,
  StyledUl,
  StyledButtonWrapper,
  StyledId,
  StyledItem
} from './StyledColumnPicker'

const ColumnPicker = ({onOk, dndEnabled, initialColumns, intl}) => {
  const [columns, setColumns] = useState(initialColumns)
  const [searchTerm, setSearchTerm] = useState(null)
  const changeColumnPosition = (currentlyDragging, currentlyDragOver, columns) => {
    if (currentlyDragging !== currentlyDragOver) {
      const currentlyDraggingItem = columns.find(c => c.id === currentlyDragging)
      setColumns(columns
        .filter(c => c !== currentlyDraggingItem)
        .reduce((acc, key) => [
          ...acc,
          key,
          ...(key.id === currentlyDragOver ? [currentlyDraggingItem] : [])
        ], []))
    }
  }
  const {dndEvents, dndState} = useDnD(changeColumnPosition, columns)

  const items = useMemo(() => columns
    .filter(column => searchTerm === null || column.label.match(new RegExp(searchTerm, 'i')))
    .map(column => <StyledItem
      key={column.id}
      draggable={dndEnabled}
      isDraggedOver={dndState.currentlyDragOver === column.id && dndState.currentlyDragging !== column.id}
      {...(dndEnabled && {...dndEvents(column.id)})}>
      <StyledCheckbox
        type={'checkbox'}
        id={column.id}
        checked={!column.hidden}
        onChange={value => setColumns(columns
          .map(c => c.id === column.id
            ? ({
                ...c,
                hidden: !value.target.checked
              })
            : c))}
      />
      <Typography.Label for={column.id}>
        {column.label || <StyledId>{column.id}</StyledId>}
      </Typography.Label>
    </StyledItem>), [searchTerm, columns, dndState])

  return (
    <div>
      <SearchBox
        placeholder={intl.formatMessage({id: 'client.entity-list.preferences.columns.search'})}
        onSearch={setSearchTerm}/>
      <StyledUl>{items}</StyledUl>
      <StyledButtonWrapper>
        <Button onClick={() => onOk(columns)} look={'raised'}>
          {intl.formatMessage({id: 'client.entity-list.preferences.columns.okButton'})}
        </Button>
      </StyledButtonWrapper>
    </div>
  )
}

ColumnPicker.propTypes = {
  initialColumns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    hidden: PropTypes.bool.isRequired
  })).isRequired,
  onOk: PropTypes.func.isRequired,
  dndEnabled: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired
}

export default ColumnPicker
