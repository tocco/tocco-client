import PropTypes from 'prop-types'
import React from 'react'
import {design, SignalList} from 'tocco-ui'

const ValidationRules = props => (
  <SignalList.List>
    {props.rules.map((rule, index) => {
      let condition = null

      let message = rule.message

      if (props.errors) {
        const error = props.errors[rule.name]
        if (error === true) {
          condition = design.condition.DANGER
        } else if (typeof error === 'string') {
          condition = design.condition.DANGER
          message = error
        } else {
          condition = design.condition.SUCCESS
        }
      }

      return (
        <SignalList.Item
          condition={condition}
          key={index}
          label={message}
        />
      )
    })}
  </SignalList.List>
)

ValidationRules.propTypes = {
  errors: PropTypes.object,
  rules: PropTypes.array.isRequired,
  rulesNeutral: PropTypes.bool
}

export default ValidationRules
