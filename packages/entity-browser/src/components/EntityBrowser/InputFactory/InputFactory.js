import React from 'react'
import TextFieldInputHandlerContainer from './../../../containers/TextFieldInputHandlerContainer'

class InputFactory extends React.Component {

  showField = () => {
    return this.props.fieldDefinition.displayType !== 'HIDDEN'
  }

  getTypeMap = () => ({
    'ch.tocco.nice2.model.form.components.simple.TextField': TextFieldInputHandlerContainer
  })

  render() {
    const map = this.getTypeMap()
    if (this.showField() && map.hasOwnProperty(this.props.fieldDefinition.type)) {
      const typeHandler = map[this.props.fieldDefinition.type]
      return React.createElement(typeHandler, {'fieldDefinition': this.props.fieldDefinition})
    }
    return null
  }
}

InputFactory.propTypes = {
  fieldDefinition: React.PropTypes.object.isRequired
}

export default InputFactory
