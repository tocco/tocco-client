import PropTypes from 'prop-types'
import React from 'react'

import typeEditorFactory, {map as typeEditorFactoryMap} from './typeEditorFactory'
import StyledEditableValue from './StyledEditableValue'

/**
 *  To edit values of given type.
 */
const EditableValue = props => (
  <StyledEditableValue>
    {
      typeEditorFactory(
        props.type,
        props.value,
        props.options,
        props.id,
        props.events,
        props.readOnly
      )
    }
  </StyledEditableValue>
)

EditableValue.propTypes = {
  /**
   * Type of value. e.g. 'string'
   */
  type: PropTypes.oneOf(
    Object.keys(typeEditorFactoryMap)
  ).isRequired,
  /**
   * Value to display
   */
  value: PropTypes.any,
  /**
   * Depending on the type an object of options can be passed
   */
  options: PropTypes.object,
  /**
   * Function that get emitted on a value change, passing the new value as first argument
   */
  onChange: PropTypes.func,
  /**
   * Id of element (for htmlFor)
   */
  id: PropTypes.string,
  /**
   * Object of functions that gets assigned to the component. E.g. {onBlur: ()=>{}}
   */
  events: PropTypes.objectOf(PropTypes.func),
  /**
   * Determines if value is editable
   */
  readOnly: PropTypes.bool
}

export default EditableValue
