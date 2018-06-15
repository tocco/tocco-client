import PropTypes from 'prop-types'
import React from 'react'
import SignalList, {SignalListItem} from 'tocco-ui/src/SignalList'

const ValidationRules = props => (
  <SignalList>
    {props.rules.map((rule, index) => {
      let condition = null

      let message = rule.message

      if (props.errors) {
        const error = props.errors[rule.name]
        if (error === true) {
          condition = 'danger'
        } else if (typeof error === 'string') {
          condition = 'danger'
          message = error
        } else {
          condition = 'success'
        }
      }

      return (
        <SignalListItem
          condition={condition}
          key={index}
          label={message}
        />
      )
    })}
  </SignalList>
)

ValidationRules.propTypes = {
  errors: PropTypes.object,
  rules: PropTypes.array.isRequired,
  rulesNeutral: PropTypes.bool
}

export default ValidationRules
