import React from 'react'

export const Rule = (props) => (
  <div className={props.className}>{props.message}</div>
)

Rule.propTypes = {
  className: React.PropTypes.string,
  message: React.PropTypes.string.isRequired
}

const ValidationRules = (props) => (
  <div className="ValidationRules">
    {props.rules.map((rule, index) => {
      let className = null
      let message = rule.message

      if (props.errors) {
        const error = props.errors[rule.name]
        if (error === true) {
          className = 'text-danger'
        } else if (typeof error === 'string') {
          className = 'text-danger'
          message = error
        } else {
          className = 'text-success'
        }
      }

      return <Rule key={index} className={className} message={message}/>
    })}
  </div>
)

ValidationRules.propTypes = {
  errors: React.PropTypes.object,
  rules: React.PropTypes.array.isRequired
}

export default ValidationRules
