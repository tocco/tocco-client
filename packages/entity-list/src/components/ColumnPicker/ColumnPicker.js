import PropTypes from 'prop-types'
import React, {useState, useMemo} from 'react'
import {Button, SearchBox, Typography} from 'tocco-ui'
import {intlShape} from 'react-intl'

import {
  StyledCheckbox,
  StyledUl,
  StyledButtonWrapper,
  StyledColumnPickerWrapper,
  StyledColumnName
} from './StyledColumnPicker'

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
        onChange={value => setSelectedColumns({...selectedColumns, [column.id]: value.target.checked})}
      />
      <Typography.Label for={column.id}>
        <StyledColumnName hasLabel={!!column.label}>{column.label || column.id}</StyledColumnName>
      </Typography.Label>
    </Typography.Li>), [columns, searchTerm, selectedColumns])

  return <StyledColumnPickerWrapper>
    <SearchBox
      placeholder={intl.formatMessage({id: 'client.entity-list.preferences.columns.search'})}
      onSearch={setSearchTerm}/>
    <StyledUl>{items}</StyledUl>
    <StyledButtonWrapper>
      <Button onClick={() => onOk(selectedColumns)} look={'raised'}>
        {intl.formatMessage({id: 'client.entity-list.preferences.columns.okButton'})}
      </Button>
    </StyledButtonWrapper>
  </StyledColumnPickerWrapper>
}

ColumnPicker.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    hidden: PropTypes.bool.isRequired
  })).isRequired,
  onOk: PropTypes.func.isRequired,
  intl: intlShape.isRequired
}

export default ColumnPicker
