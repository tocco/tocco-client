import React from 'react'
import _clone from 'lodash/clone'
import {EditableValue} from 'tocco-ui'
import classNames from 'classnames'
import FieldErrorList from './FieldErrorList'

const LabeledField = props => {
  const {input, label, type, options, meta: {dirty, touched, error, submitting}, mandatory, id} = props
  const extractEventsFromInput = () => {
    const events = _clone(input)
    delete events.name
    delete events.value
    delete events.onChange
    return events
  }

  const events = extractEventsFromInput()

  const labelClass = classNames({
    'dirty-label': dirty
  })

  const fromGroupClass = classNames('form-group', {
    'has-error': error && touched
  })

  return (
    <div className={fromGroupClass}>
      <label className="col-sm-4 control-label">
        <span className={labelClass}>{label}</span>
        {mandatory && <span title="Mandatory field" className="mandatory"> *</span>}
      </label>
      <div className="col-sm-8">
        <EditableValue
          id={id}
          readOnly={submitting}
          value={input.value}
          onChange={input.onChange}
          type={type}
          events={events}
          options={options}
        />
        {touched && error && <FieldErrorList errors={error}/>}
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
    error: React.PropTypes.objectOf(React.PropTypes.arrayOf(React.PropTypes.string))
  }),
  options: React.PropTypes.shape({
    store: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        value: React.PropTypes.any,
        label: React.PropTypes.string
      }))
  }),
  mandatory: React.PropTypes.bool,
  id: React.PropTypes.string
}

export default LabeledField
