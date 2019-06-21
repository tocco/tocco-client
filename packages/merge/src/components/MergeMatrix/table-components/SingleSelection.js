import PropTypes from 'prop-types'
import React from 'react'
import {Typography} from 'tocco-ui'

import {StyledMergeMatrixLabel} from '../StyledMergeMatrix'

const SingleSelectionCell = props => {
  const clickFnc = () => props.onChange(props.identifier, props.pk)
  return (
    <StyledMergeMatrixLabel>
      <input
        type="radio"
        disabled={props.disabled}
        onChange={clickFnc}
        checked={props.checked}
        name={props.identifier}
      /><Typography.Span>{props.children}</Typography.Span>
    </StyledMergeMatrixLabel>
  )
}

SingleSelectionCell.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  identifier: PropTypes.string.isRequired,
  pk: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.node
}

export default SingleSelectionCell
