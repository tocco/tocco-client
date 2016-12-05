import React from 'react'
import * as ToccoUI from 'tocco-ui'

const TextFieldInputHandler = props => {
  const onSearch = value => {
    props.setSearchTerm({
      name: props.fieldDefinition.name,
      value: value
    })
  }

  return (
    <ToccoUI.SearchBox
      onSearch={onSearch}
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
