import React from 'react'

export const Rule = props => (
  <li className={props.className}>{props.message}</li>
)

Rule.propTypes = {
  className: React.PropTypes.string,
  message: React.PropTypes.string.isRequired
}

const ValidationRules = props => (
  <ul className="ValidationRules icon-list">
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
      } else {
        className = 'text-danger'
      }

      return <Rule key={index} className={className} message={message}/>
    })}
  </ul>
)

ValidationRules.propTypes = {
  errors: React.PropTypes.object,
  rules: React.PropTypes.array.isRequired
}

export default ValidationRules
