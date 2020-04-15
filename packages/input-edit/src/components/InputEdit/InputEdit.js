import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {Panel} from 'tocco-ui'

import InputEditTable from '../InputEditTable/InputEditTableContainer'
import {FlexRow} from './StyledComponents'
import InputEditPagination from '../InputEditPagination'
import InputEditSearch from '../InputEditSearch'

const InputEdit = ({inputEntityKey, initializeTable, initializeSearch}) => {
  useEffect(() => {
    initializeTable()
    initializeSearch()
  }, [inputEntityKey])
  return <FlexRow>
    <Panel.Wrapper key={'search'}>
      <Panel.Body>
        <InputEditSearch/>
      </Panel.Body>
    </Panel.Wrapper>
    <Panel.Wrapper key={'list'} isToggleable={false}>
      <Panel.Body>
        <InputEditTable/>
      </Panel.Body>
      <Panel.Footer>
        <InputEditPagination/>
      </Panel.Footer>
    </Panel.Wrapper>
  </FlexRow>
}

InputEdit.propTypes = {
  inputEntityKey: PropTypes.number.isRequired,
  initializeTable: PropTypes.func.isRequired,
  initializeSearch: PropTypes.func.isRequired
}

export default InputEdit
