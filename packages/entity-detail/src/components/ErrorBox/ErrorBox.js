import PropTypes from 'prop-types'
import React from 'react'
import {FormattedMessage} from 'react-intl'
import {Link, SignalBox} from 'tocco-ui'
import SignalList, {SignalListItem} from 'tocco-ui/src/SignalList'
import {stylingCondition} from 'tocco-ui/src/utilStyles'
import {form} from 'tocco-util'

const ErrorBox = ({formErrors, showErrors}) => {
  let output = null
  const elements = []

  if (form.formErrorsUtil.hasFieldErrors(formErrors)) {
    elements.push(
      <SignalListItem
        condition={stylingCondition.DANGER}
        key="hasFieldErrors"
      >
        <Link
          label={<FormattedMessage id="client.entity-detail.invalidFieldsError"/>}
          neutral
          onClick={showErrors}
        />
      </SignalListItem>
    )
  }

  if (form.formErrorsUtil.hasValidatorErrors(formErrors)) {
    elements.push(
      <SignalListItem condition={stylingCondition.DANGER} key="hasValidatorErrors">
        <FormattedMessage id="client.entity-detail.validatorErrors"/>
        <SignalList>
          {form.formErrorsUtil.getValidatorErrors(formErrors).map((message, idx) =>
            <SignalListItem condition={stylingCondition.DANGER} key={idx} label={message} />
          )}
        </SignalList>
      </SignalListItem>
    )
  }

  if (form.formErrorsUtil.hasRelatedEntityErrors(formErrors)) {
    elements.push(
      <SignalListItem condition={stylingCondition.DANGER} key="hasRelatedEntityErrors">
        <FormattedMessage id="client.entity-detail.invalidRelationErrors"/>
        <SignalList>
          {form.formErrorsUtil.getRelatedEntityErrorsCompact(formErrors).map((message, idx) =>
            <SignalListItem condition={stylingCondition.DANGER} key={idx} label={message} />
          )}
        </SignalList>
      </SignalListItem>
    )
  }

  if (elements.length > 0) {
    output = (
      <SignalBox condition={stylingCondition.DANGER}>
        <SignalList>
          {elements.map(el => el)}
        </SignalList>
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
