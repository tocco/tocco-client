import React from 'react'
import PropTypes from 'prop-types'
import {Icon, Typography} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'

import sourceDataPropType from '../../util/sourceDataPropType'
import {StyledMergeErrorWrapper, StyledSummaryErrorWrapper, StyledIconWrapper, StyledError} from './StyledComponents'

const MergeErrors = ({sourceData, mergeErrorMsg, mergeValidationErrors}) => {
  const allMergerValidationErrors = mergeValidationErrors.map(e => {
    const fieldValidators = Object.keys(e.paths)
      .map(name => Object.keys(e.paths[name]).map(
        validator => e.paths[name][validator].map((msg, index) =>
          <StyledError key={`paths-${name}-${validator}-${index}`}>{sourceData.labels[name]}: {msg}</StyledError>
        )
      ))

    const entityValidators = Object.keys(e.entityValidatorErrors)
      .map(validator => e.entityValidatorErrors[validator].map((msg, index) =>
        <StyledError key={`entity-${validator}-${index}`}>{msg}</StyledError>
      ))

    return [...fieldValidators, ...entityValidators]
  })

  return (
    <StyledMergeErrorWrapper>
      <StyledSummaryErrorWrapper>
        <StyledIconWrapper>
          <Icon icon="times"/>
        </StyledIconWrapper>
        <Typography.P>
          <FormattedMessage id="client.merge.summary.error"/>
        </Typography.P>
      </StyledSummaryErrorWrapper>
      {Boolean(mergeErrorMsg) && <StyledError>{mergeErrorMsg}</StyledError>}
      {allMergerValidationErrors}
    </StyledMergeErrorWrapper>
  )
}

export const mergeValidationErrorsPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    model: PropTypes.string,
    key: PropTypes.string,
    paths: PropTypes.objectOf(PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string))),
    entityValidatorErrors: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string))
  })
)

MergeErrors.propTypes = {
  sourceData: sourceDataPropType,
  mergeErrorMsg: PropTypes.string,
  mergeValidationErrors: mergeValidationErrorsPropTypes
}

export default MergeErrors
