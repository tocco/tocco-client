import React from 'react'
import _clone from 'lodash/clone'
import * as ToccoUi from 'tocco-ui'

const LabeledField = ({input, label, type, meta: {touched, error, warning}}) => {
  const events = _clone(input)
  delete events.name
  delete events.value
  delete events.onChange

  return (
    <div className="form-group">
      <label className="control-label col-sm-5">{label}:</label>
      <div className="col-sm-7">
        <p className="form-control-static">
          <ToccoUi.EditableValue value={input.value} onChange={input.onChange} type={type} events={events}/>
          {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </p>
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
  label: React.PropTypes.object,
  type: React.PropTypes.object,
  meta: React.PropTypes.shape({
    touched: React.PropTypes.bool,
    error: React.PropTypes.string,
    warning: React.PropTypes.string
  })
}

export default LabeledField
