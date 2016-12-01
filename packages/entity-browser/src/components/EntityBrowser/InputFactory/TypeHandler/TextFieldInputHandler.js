import React from 'react'
import * as ToccoUI from 'tocco-ui'

class TextFieldInputHandler extends React.Component {

  onSearch = value => {
    this.props.setSearchTerm({
      name: this.props.fieldDefinition.name,
      value: value
    })
  }

  render() {
    return (
      <ToccoUI.SearchBox
        onSearch={this.onSearch}
        placeholder={this.props.fieldDefinition.label}
        liveSearch
      />
    )
  }
}

TextFieldInputHandler.propTypes = {
  fieldDefinition: React.PropTypes.object.isRequired,
  setSearchTerm: React.PropTypes.func
}

export default TextFieldInputHandler
