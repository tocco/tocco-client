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

  if (form.formErrorsUtil.hasFieldErrors(formErrors)) {
    elements.push(
      <StyledErrorItemWrapper key="hasFieldErrors">
        <Typography.H5>
          <FormattedMessage id="client.entity-detail.invalidFieldsError"/>
        </Typography.H5>
      </StyledErrorItemWrapper>
    )
  }

  if (form.formErrorsUtil.hasValidatorErrors(formErrors)) {
    elements.push(
      <StyledErrorItemWrapper key="hasValidatorErrors">
        <Typography.H5>
          <FormattedMessage id="client.entity-detail.validatorErrors"/>
        </Typography.H5>
        {form.formErrorsUtil.getValidatorErrors(formErrors).map((message, idx) =>
          <ErrorItem key={idx}>
            {message}
          </ErrorItem>
        )}
      </StyledErrorItemWrapper>
    )
  }

  if (form.formErrorsUtil.hasRelatedEntityErrors(formErrors)) {
    elements.push(
      <StyledErrorItemWrapper key="hasRelatedEntityErrors">
        <Typography.H5>
          <FormattedMessage id="client.entity-detail.invalidRelationErrors"/>
        </Typography.H5>
        {form.formErrorsUtil.getRelatedEntityErrorsCompact(formErrors).map((message, idx) =>
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
