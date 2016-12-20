import React from 'react'
import typeEditorFactory, {map as typeEditorFactoryMap} from './typeEditorFactory'

import './styles.scss'

/**
 *  To edit values of given type.
 */
const EditableValue = props => {
  return (
    <span className="tocco-editable-value">
      {
        typeEditorFactory(props.type, props.value, props.onChange, props.options)
      }
    </span>
  )
}

EditableValue.propTypes = {
  /**
   * Type of value. e.g. 'string'
   */
  type: React.PropTypes.oneOf(
    Object.keys(typeEditorFactoryMap)
  ).isRequired,
  /**
   * Value to display
   */
  value: React.PropTypes.any,
  /**
   * Depending on the type an object of options can be passed
   */
  options: React.PropTypes.object,
  /**
   * Function that get emitted on a value change, passing the new value as first argument
   */
  onChange: React.PropTypes.func
}

export default EditableValue

