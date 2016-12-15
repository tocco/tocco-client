import React from 'react'
import {TextFieldInputHandler} from './TypeHandler'

const InputFactory = props => {
  const getTypeMap = () => {
    return {
      'ch.tocco.nice2.model.form.components.simple.TextField': TextFieldInputHandler
    }
  }

  const showField = fieldDefinition => {
    return fieldDefinition.displayType !== 'HIDDEN' && getTypeMap().hasOwnProperty(fieldDefinition.type)
  }

  return (
    showField(props.fieldDefinition)
    && React.createElement(
      getTypeMap()[props.fieldDefinition.type],
      {'fieldDefinition': props.fieldDefinition, 'setSearchTerm': props.setSearchTerm}
    )
  )
}

InputFactory.propTypes = {
  fieldDefinition: React.PropTypes.object.isRequired,
  setSearchTerm: React.PropTypes.func
}

export default InputFactory
