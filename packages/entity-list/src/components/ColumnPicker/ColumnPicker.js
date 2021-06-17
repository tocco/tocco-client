import PropTypes from 'prop-types'
import React, {useState, useMemo} from 'react'
import {Button, SearchBox, Typography} from 'tocco-ui'

import {
  StyledCheckbox,
  StyledUl,
  StyledButtonWrapper,
  StyledColumnPickerWrapper,
  StyledId
} from './StyledColumnPicker'

const ColumnPicker = props => {
  const {onOk, intl} = props
  const [columns, setColumns] = useState(props.columns)
  const [searchTerm, setSearchTerm] = useState(null)
  const items = useMemo(() => columns
    .filter(column => searchTerm === null || column.label.match(new RegExp(searchTerm, 'i')))
    .map(column => <Typography.Li key={column.id}>
      <StyledCheckbox
        type={'checkbox'}
        id={column.id}
        checked={!column.hidden}
        onChange={value => setColumns(columns
          .map(c => c.id === column.id ? ({...c, hidden: !value.target.checked}) : c))}
      />
      <Typography.Label for={column.id}>
        {column.label || <StyledId>{column.id}</StyledId>}
      </Typography.Label>
    </Typography.Li>), [searchTerm, columns])

  return <StyledColumnPickerWrapper>
    <SearchBox
      placeholder={intl.formatMessage({id: 'client.entity-list.preferences.columns.search'})}
      onSearch={setSearchTerm}/>
    <StyledUl>{items}</StyledUl>
    <StyledButtonWrapper>
      <Button onClick={() => onOk(columns)} look={'raised'}>
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
  intl: PropTypes.object.isRequired
}

export default ColumnPicker
