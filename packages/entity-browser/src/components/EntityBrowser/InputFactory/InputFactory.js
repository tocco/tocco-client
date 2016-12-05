import React from 'react'
import {TextFieldInputHandler} from './TypeHandler'

const InputFactory = ({fieldDefinition, setSearchTerm}) => {
  const getTypeMap = () => {
    return {
      'ch.tocco.nice2.model.form.components.simple.TextField': TextFieldInputHandler
    }
  }

  const showField = fieldDefinition => {
    return fieldDefinition.displayType !== 'HIDDEN' && getTypeMap().hasOwnProperty(fieldDefinition.type)
  }

  return (
    showField(fieldDefinition)
    && React.createElement(
      getTypeMap()[fieldDefinition.type], {'fieldDefinition': fieldDefinition, 'setSearchTerm': setSearchTerm}
    )
  )
}

InputFactory.propTypes = {
  fieldDefinition: React.PropTypes.object.isRequired,
  setSearchTerm: React.PropTypes.func
}

export default InputFactory
