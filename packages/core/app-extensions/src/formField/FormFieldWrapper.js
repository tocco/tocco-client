import PropTypes from 'prop-types'
import React from 'react'
import {StatedValue} from 'tocco-ui'

const FormFieldWrapper = props => {
  const {typeEditable, value, formData, formField, dirty, error, children} = props
  const hasOverwrite = typeEditable && typeEditable.hasValue
  const hasValue = hasOverwrite
    ? typeEditable.hasValue({formValues: formData.formValues, formField, value})
    : value !== null && value !== undefined && value !== false && (value.length === undefined || value.length > 0)

  return (
    <StatedValue {...props} dirty={formData.isDirty || dirty} error={formData.errors || error} hasValue={hasValue}>
      {React.cloneElement(children, {formData})}
    </StatedValue>
  )
}

FormFieldWrapper.propTypes = {
  typeEditable: PropTypes.object,
  children: PropTypes.node,
  formData: PropTypes.object,
  formField: PropTypes.object,
  dirty: PropTypes.bool,
  error: PropTypes.object,
  value: PropTypes.any
}

export default FormFieldWrapper
