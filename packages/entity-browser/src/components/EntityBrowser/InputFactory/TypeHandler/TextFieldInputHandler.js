import React from 'react'
import * as ToccoUI from 'tocco-ui'

const TextFieldInputHandler = props => {
  return (
    props.fieldDefinition.name === 'txtFulltext'
    && <ToccoUI.SearchBox
      onSearch={props.setSearchTerm}
      placeholder={props.fieldDefinition.label}
      liveSearch
    />
  )
}

TextFieldInputHandler.propTypes = {
  fieldDefinition: React.PropTypes.object.isRequired,
  setSearchTerm: React.PropTypes.func
}

export default TextFieldInputHandler
