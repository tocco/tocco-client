import React, {useEffect} from 'react'
import PropTypes from 'prop-types'

import InputEditTable from '../InputEditTable/InputEditTableContainer'
import {FlexColumn, FlexRow} from './StyledComponents'
import InputEditSearch from '../InputEditSearch'
import InputEditPagination from '../InputEditPagination'

const InputEdit = ({initializeTable, initializeSearch}) => {
  useEffect(() => {
    initializeTable()
    initializeSearch()
  }, [])
  return <FlexRow>
    <InputEditSearch/>
    <FlexColumn>
      <InputEditTable/>
      <InputEditPagination/>
    </FlexColumn>
  </FlexRow>
}

InputEdit.propTypes = {
  initializeTable: PropTypes.func.isRequired,
  initializeSearch: PropTypes.func.isRequired
}

export default InputEdit
