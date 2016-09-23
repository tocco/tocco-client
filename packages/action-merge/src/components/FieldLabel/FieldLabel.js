import React from 'react'
import labelProvider from './LabelProvider'

const FieldLabel = props => {
  return labelProvider(props.field)
}

FieldLabel.propTypes = {
  field: React.PropTypes.object
}

export default FieldLabel
