import {selectUnit} from '@formatjs/intl-utils'
import PropTypes from 'prop-types'
import React from 'react'
import {FormattedMessage, FormattedRelativeTime} from 'react-intl'
import styled from 'styled-components'
import {form} from 'tocco-app-extensions'
import {FormattedValue, scale, Typography} from 'tocco-ui'

export const ErrorItem = ({message}) => (
  <div>
    <FormattedValue type="html" value={message} />
  </div>
)

ErrorItem.propTypes = {
  message: PropTypes.string.isRequired
}

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
  const hasOutdatedError = form.formErrorsUtil.hasOutdatedError(formErrors)

  if (hasOutdatedError) {
    const outdatedError = form.formErrorsUtil.getOutdatedError(formErrors)
    const {value: timeStampValue, unit} = selectUnit(new Date(outdatedError.updateTimestamp))

    const titleId = `client.entity-detail.${outdatedError.sameEntity ? 'outdated' : 'relatedOutdated'}ErrorTitle`

    elements.push(
      <StyledErrorItemWrapper key="outDatedError">
        <Typography.H5>
          <FormattedMessage
            id={titleId}
            values={{
              model: outdatedError.model,
              key: outdatedError.key
            }}
          />
        </Typography.H5>
        <FormattedMessage
          id="client.entity-detail.outdatedErrorDescription"
          values={{
            ago: <FormattedRelativeTime value={timeStampValue} unit={unit} />,
            user: outdatedError.updateUser
          }}
        />
      </StyledErrorItemWrapper>
    )
  }

  if (hasFieldErrors) {
    elements.push(
      !hasValidatorErrors && !hasRelatedEntityErrors ? (
        <StyledErrorItemWrapper key="hasFieldErrors">
          <FormattedMessage id="client.entity-detail.invalidFieldsError" />
        </StyledErrorItemWrapper>
      ) : (
        <StyledErrorItemWrapper key="hasFieldErrors">
          <Typography.H5>
            <FormattedMessage id="client.entity-detail.invalidFieldsError" />
          </Typography.H5>
        </StyledErrorItemWrapper>
      )
    )
  }

  if (hasValidatorErrors) {
    elements.push(
      <StyledErrorItemWrapper key="hasValidatorErrors">
        <Typography.H5>
          <FormattedMessage id="client.entity-detail.validatorErrors" />
        </Typography.H5>
        {validatorErrors.map((message, idx) => (
          <ErrorItem key={idx} message={message} />
        ))}
      </StyledErrorItemWrapper>
    )
  }

  if (hasRelatedEntityErrors) {
    elements.push(
      <StyledErrorItemWrapper key="hasRelatedEntityErrors">
        <Typography.H5>
          <FormattedMessage id="client.entity-detail.invalidRelationErrors" />
        </Typography.H5>
        {relatedEntityErrorsCompact.map((message, idx) => (
          <ErrorItem key={idx} message={message} />
        ))}
      </StyledErrorItemWrapper>
    )
  }

  if (elements.length > 0) {
    output = <>{elements.map(el => el)}</>
  }
  return output
}

ErrorItems.propTypes = {
  formErrors: PropTypes.object
}

export default ErrorItems
