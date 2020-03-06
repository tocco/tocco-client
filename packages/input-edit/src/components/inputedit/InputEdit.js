import React, {useEffect} from 'react'
import PropTypes from 'prop-types'

import InputEditTable from '../inputedittable/InputEditTableContainer'

const InputEdit = ({initializeTable}) => {
  useEffect(() => {
    initializeTable()
  }, [])
  return <InputEditTable/>
}

InputEdit.propTypes = {
  initializeTable: PropTypes.func.isRequired
}

export default InputEdit
