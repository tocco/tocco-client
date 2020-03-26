import React, {useEffect} from 'react'
import PropTypes from 'prop-types'

import InputEditTable from '../InputEditTable/InputEditTableContainer'
import {FlexDiv} from './StyledComponents'
import InputEditSearch from '../InputEditSearch'

const InputEdit = ({initializeTable, initializeSearch}) => {
  useEffect(() => {
    initializeTable()
    initializeSearch()
  }, [])
  return <FlexDiv>
    <InputEditSearch/>
    <InputEditTable/>
  </FlexDiv>
}

InputEdit.propTypes = {
  initializeTable: PropTypes.func.isRequired,
  initializeSearch: PropTypes.func.isRequired
}

export default InputEdit
