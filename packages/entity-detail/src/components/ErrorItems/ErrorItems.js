import PropTypes from 'prop-types'
import React from 'react'
import {FormattedMessage} from 'react-intl'
import {form} from 'tocco-app-extensions'
import Typography from 'tocco-ui/src/Typography'
import styled from 'styled-components'

export const ErrorItem = styled.div``

const ErrorItems = ({formErrors}) => {
  let output = null
  const elements = []

  if (form.formErrorsUtil.hasFieldErrors(formErrors)) {
    elements.push(
      <div
        key="hasFieldErrors"
      >
        <Typography.H6>
          <FormattedMessage id="client.entity-detail.invalidFieldsError"/>
        </Typography.H6>
      </div>
    )
  }

  if (form.formErrorsUtil.hasValidatorErrors(formErrors)) {
    elements.push(
      <div key="hasValidatorErrors">
        <Typography.H5>
          <FormattedMessage id="client.entity-detail.validatorErrors"/>
        </Typography.H5>
        {form.formErrorsUtil.getValidatorErrors(formErrors).map((message, idx) =>
          <ErrorItem key={idx}>
            {message}
          </ErrorItem>
        )}
      </div>
    )
  }

  if (form.formErrorsUtil.hasRelatedEntityErrors(formErrors)) {
    elements.push(
      <div key="hasRelatedEntityErrors">
        <Typography.H5>
          <FormattedMessage id="client.entity-detail.invalidRelationErrors"/>
        </Typography.H5>
        {form.formErrorsUtil.getRelatedEntityErrorsCompact(formErrors).map((message, idx) =>
          <ErrorItem key={idx}>
            {message}
          </ErrorItem>
        )}
      </div>
    )
  }

  if (elements.length > 0) {
    output = (
      <>
        {elements.map(el => el)}
      </>
    )
  }
  return output
}

ErrorItems.propTypes = {
  formErrors: PropTypes.object
}

export default ErrorItems
