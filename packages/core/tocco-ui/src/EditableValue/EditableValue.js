import _omit from 'lodash/omit'
import PropTypes from 'prop-types'

import EditorProvider, {map as typeEditorFactoryMap} from './EditorProvider'
import StyledEditableValue from './StyledEditableValue'

/**
 *  To edit values of given type.
 */
const EditableValue = props => (
  <StyledEditableValue>
    <EditorProvider componentType={props.type} {..._omit(props, 'type')} />
  </StyledEditableValue>
)

EditableValue.propTypes = {
  /**
   * Type of component. (e.g. phone or single-select)
   */
  type: PropTypes.oneOf(Object.keys(typeEditorFactoryMap)).isRequired,
  /**
   * Value to display
   */
  value: PropTypes.any,
  /**
   * Depending on the type an object of options can be passed
   */
  options: PropTypes.object,
  /**
   * Id of element (for htmlFor)
   */
  id: PropTypes.string,
  /**
   * Object of functions that gets assigned to the component. E.g. {onChange: v => {}, onBlur: () => {}}
   */
  events: PropTypes.objectOf(PropTypes.func),
  /**
   * Determines if value is editable
   */
  readOnly: PropTypes.bool
}

export default EditableValue
