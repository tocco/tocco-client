import React from 'react'
import _clone from 'lodash/clone'
import * as ToccoUi from 'tocco-ui'

const ErrorList = props => {
  if (!props.errors) {
    return null
  }

  const errorValues = Object.values(props.errors)
  return (
    <ul className="error-list">
      {errorValues.map((value, idx) => (
        <li key={idx}>{value}</li>
      ))}
    </ul>
  )
}

ErrorList.propTypes = {
  errors: React.PropTypes.objectOf(
    React.PropTypes.string
  ).isRequired
}

const LabeledField = ({input, label, type, meta: {touched, error}}) => {
  const events = _clone(input)
  delete events.name
  delete events.value
  delete events.onChange

  return (
    <div className="form-group">
      <label className="control-label col-sm-5">{label}:</label>
      <div className="col-sm-7">
        <div className="form-control-static">
          <ToccoUi.EditableValue value={input.value} onChange={input.onChange} type={type} events={events}/>
          {touched && error && <ErrorList errors={error}/>}
        </div>
      </div>
    </div>
  )
}

LabeledField.propTypes = {
  input: React.PropTypes.shape({
    value: React.PropTypes.any,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func
  }),
  label: React.PropTypes.string,
  type: React.PropTypes.string,
  meta: React.PropTypes.shape({
    touched: React.PropTypes.bool,
    error: React.PropTypes.objectOf(React.PropTypes.string)
  })
}

export default LabeledField
