import PropTypes from 'prop-types'
import React, {useState, useMemo} from 'react'
import {Button, SearchBox, Typography} from 'tocco-ui'
import styled from 'styled-components'
import {intlShape} from 'react-intl'

const StyledUl = styled('ul')`
  && {
    list-style-type: none;
  }
`

const StyledCheckbox = styled('input')`
  && {
    vertical-align: top;
  }
`

const ColumnPicker = ({columns, onOk, intl}) => {
  const [selectedColumns, setSelectedColumns] = useState({})
  const [searchTerm, setSearchTerm] = useState(null)
  const items = useMemo(() => columns
    .filter(column => searchTerm === null || column.label.match(new RegExp(searchTerm, 'i')))
    .map(column => <Typography.Li key={column.id}>
      <StyledCheckbox
        type={'checkbox'}
        id={column.id}
        checked={Object.prototype.hasOwnProperty.call(selectedColumns, column.id)
          ? selectedColumns[column.id] : !column.hidden}
        onChange={value => setSelectedColumns({...selectedColumns, [column.id]: value.target.checked})}/>
      <Typography.Label for={column.id}>{column.label}</Typography.Label>
    </Typography.Li>), [columns, searchTerm, selectedColumns])

  return <>
    <SearchBox
      placeholder={intl.formatMessage({id: 'client.entity-list.preferences.columns.search'})}
      onSearch={setSearchTerm}/>
    <StyledUl>{items}</StyledUl>
    <Button onClick={() => onOk(selectedColumns)}>
      {intl.formatMessage({id: 'client.entity-list.preferences.columns.okButton'})}
    </Button>
  </>
}

ColumnPicker.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    hidden: PropTypes.bool.isRequired
  })).isRequired,
  onOk: PropTypes.func.isRequired,
  intl: intlShape.isRequired
}

export default ColumnPicker
