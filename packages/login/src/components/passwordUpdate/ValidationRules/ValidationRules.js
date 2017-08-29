import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

export const Rule = props => (
  <li className={props.className}>{props.message}</li>
)

Rule.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string.isRequired
}

const ValidationRules = props => (
  <ul className={classNames('icon-list', {'neutral': props.rulesNeutral})}>
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
  </ul>
)

ValidationRules.propTypes = {
  errors: PropTypes.object,
  rules: PropTypes.array.isRequired,
  rulesNeutral: PropTypes.bool
}

export default ValidationRules
