import PropTypes from 'prop-types'
import React from 'react'
import {FormattedMessage} from 'react-intl'
import {form} from 'tocco-app-extensions'
import Typography from 'tocco-ui/src/Typography'
import styled from 'styled-components'
import {scale} from 'tocco-ui'

export const ErrorItem = styled.div``

const StyledErrorItemWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: ${scale.space(0.4)};
  }
`

const ErrorItems = ({formErrors}) => {
  let output = null
  const elements = []

  const hasFieldErrors = form.formErrorsUtil.hasFieldErrors(formErrors)
  const hasValidatorErrors = form.formErrorsUtil.hasValidatorErrors(formErrors)
  const hasRelatedEntityErrors = form.formErrorsUtil.hasRelatedEntityErrors(formErrors)
  const validatorErrors = form.formErrorsUtil.getValidatorErrors(formErrors)
  const relatedEntityErrorsCompact = form.formErrorsUtil.getRelatedEntityErrorsCompact(formErrors)

  if (hasFieldErrors) {
    elements.push(
      !hasValidatorErrors && !hasRelatedEntityErrors
        ? (
          <StyledErrorItemWrapper key="hasFieldErrors">
            <FormattedMessage id="client.entity-detail.invalidFieldsError"/>
          </StyledErrorItemWrapper>
          )
        : (
          <StyledErrorItemWrapper key="hasFieldErrors">
            <Typography.H5>
              <FormattedMessage id="client.entity-detail.invalidFieldsError"/>
            </Typography.H5>
          </StyledErrorItemWrapper>
          )
    )
  }

  if (hasValidatorErrors) {
    elements.push(
      <StyledErrorItemWrapper key="hasValidatorErrors">
        <Typography.H5>
          <FormattedMessage id="client.entity-detail.validatorErrors"/>
        </Typography.H5>
        {validatorErrors.map((message, idx) =>
          <ErrorItem key={idx}>
            {message}
          </ErrorItem>
        )}
      </StyledErrorItemWrapper>
    )
  }

  if (hasRelatedEntityErrors) {
    elements.push(
      <StyledErrorItemWrapper key="hasRelatedEntityErrors">
        <Typography.H5>
          <FormattedMessage id="client.entity-detail.invalidRelationErrors"/>
        </Typography.H5>
        {relatedEntityErrorsCompact.map((message, idx) =>
          <ErrorItem key={idx}>
            {message}
          </ErrorItem>
        )}
      </StyledErrorItemWrapper>
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
