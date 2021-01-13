import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import declareFont from 'tocco-ui/src/utilStyles/declareFont'

import sourceDataPropType from '../../util/sourceDataPropType'

const StyledError = styled.p`
  && {
    ${declareFont()}
    color: #f00;
  }
`

const MergeErrors = ({sourceData, mergeErrorMsg, mergeValidationErrors}) => <>
  {
    !!mergeErrorMsg && <StyledError>{mergeErrorMsg}</StyledError>
  }
  {
    mergeValidationErrors.map(e => {
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
  }
</>

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
