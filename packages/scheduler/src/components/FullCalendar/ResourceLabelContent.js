import React from 'react'
import PropTypes from 'prop-types'

const ResourceLabelContent = ({fieldValue, resource, onCalendarRemove}) => <>
  <input
    type="checkbox"
    defaultChecked={true}
    className="remove-resource-checkbox"
    onClick={() => onCalendarRemove(resource.extendedProps.entityKey, resource.extendedProps.entityModel)}
  />
  {fieldValue}
</>

ResourceLabelContent.propTypes = {
  fieldValue: PropTypes.string,
  resource: PropTypes.shape({
    extendedProps: PropTypes.shape({
      entityKey: PropTypes.string,
      entityModel: PropTypes.string
    })
  }).isRequired,
  onCalendarRemove: PropTypes.func.isRequired

}

export default ResourceLabelContent
