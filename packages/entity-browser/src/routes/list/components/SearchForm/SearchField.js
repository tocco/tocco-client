import React from 'react'
import {EditableValue} from 'tocco-ui'

import editableValuePropertyMapper from './editableValuePropertyMapper'

const SearchField = props => {
  const handleOnChange = value => {
    props.setSearchInput(props.name, value)
  }

  const properties = editableValuePropertyMapper(props.type)(
    props.name,
    props.value,
    props.relationEntities,
    props.entityModel
  )

  return <EditableValue {...properties} onChange={handleOnChange}/>
}

SearchField.propTypes = {
  type: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  entityModel: React.PropTypes.objectOf(
    React.PropTypes.shape({
      type: React.PropTypes.string.isRequired,
      targetEntity: React.PropTypes.string
    })
  ).isRequired,
  relationEntities: React.PropTypes.objectOf(
    React.PropTypes.arrayOf(
      React.PropTypes.shape({
        displayName: React.PropTypes.string.isRequired,
        value: React.PropTypes.string.isRequired
      })
    )).isRequired,
  setSearchInput: React.PropTypes.func.isRequired,
  value: React.PropTypes.any
}

export default SearchField
