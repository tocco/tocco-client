import React from 'react'
import './ValidationRules.scss'

const Rule = (props) => (
  <div className={'status-' + props.status}>{props.message}</div>
)

Rule.propTypes = {
  status: React.PropTypes.oneOf(['valid', 'invalid', 'unknown']).isRequired,
  message: React.PropTypes.string.isRequired
}

const ValidationRules = (props) => (
  <div className="ValidationRules">
    {props.rules.map((rule, index) => {
      const status = props.errors === null ? 'unknown' : (props.errors[rule.id] === true ? 'invalid' : 'valid')
      return <Rule key={index} status={status} message={rule.message}/>
    })}
  </div>
)

ValidationRules.propTypes = {
  errors: React.PropTypes.object,
  rules: React.PropTypes.array.isRequired
}

export default ValidationRules
