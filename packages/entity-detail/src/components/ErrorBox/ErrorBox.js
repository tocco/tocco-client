import PropTypes from 'prop-types'
import React from 'react'
import {FormattedMessage} from 'react-intl'
import {Link, SignalBox, SignalList, stylingCondition} from 'tocco-ui'
import {form} from 'tocco-util'

const ErrorBox = ({formErrors, showErrors}) => {
  let output = null
  const elements = []

  if (form.formErrorsUtil.hasFieldErrors(formErrors)) {
    elements.push(
      <SignalList.Item
        condition={stylingCondition.DANGER}
        key="hasFieldErrors"
      >
        <Link
          label={<FormattedMessage id="client.entity-detail.invalidFieldsError"/>}
          neutral
          onClick={showErrors}
        />
      </SignalList.Item>
    )
  }

  if (form.formErrorsUtil.hasValidatorErrors(formErrors)) {
    elements.push(
      <SignalList.Item condition={stylingCondition.DANGER} key="hasValidatorErrors">
        <FormattedMessage id="client.entity-detail.validatorErrors"/>
        <SignalList.List>
          {form.formErrorsUtil.getValidatorErrors(formErrors).map((message, idx) =>
            <SignalList.Item condition={stylingCondition.DANGER} key={idx} label={message} />
          )}
        </SignalList.List>
      </SignalList.Item>
    )
  }

  if (form.formErrorsUtil.hasRelatedEntityErrors(formErrors)) {
    elements.push(
      <SignalList.Item condition={stylingCondition.DANGER} key="hasRelatedEntityErrors">
        <FormattedMessage id="client.entity-detail.invalidRelationErrors"/>
        <SignalList.List>
          {form.formErrorsUtil.getRelatedEntityErrorsCompact(formErrors).map((message, idx) =>
            <SignalList.Item condition={stylingCondition.DANGER} key={idx} label={message} />
          )}
        </SignalList.List>
      </SignalList.Item>
    )
  }

  if (elements.length > 0) {
    output = (
      <SignalBox condition={stylingCondition.DANGER}>
        <SignalList.List>
          {elements.map(el => el)}
        </SignalList.List>
      </SignalBox>
    )
  }
  return output
}

ErrorBox.propTypes = {
  formErrors: PropTypes.object,
  showErrors: PropTypes.func.isRequired
}

export default ErrorBox
