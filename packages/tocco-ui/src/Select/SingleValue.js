import React from 'react'
import PropTypes from 'prop-types'
import {components} from 'react-select'
import _get from 'lodash/get'
import {html} from 'tocco-util'

import Popover from '../Popover'
import ClickableWrapper from './ClickableWrapper'
import {StyledSingleValueWrapper} from './StyledComponents'

export const SingleValue = props => {
  const {
    data,
    selectProps,
    isDisabled,
    children
  } = props
  const {
    tooltips,
    loadTooltip,
    DetailLink
  } = selectProps
  const tooltip = _get(tooltips, data.key, null)
  const content = DetailLink
    ? <ClickableWrapper onMouseDown={e => {
      e.stopPropagation()
      e.preventDefault()
    }}>
      <DetailLink entityKey={data.key}>{children}</DetailLink>
    </ClickableWrapper>
    : children

  return (
    <components.SingleValue {...props}>
      <StyledSingleValueWrapper
        onMouseOver={() => loadTooltip && !tooltip && loadTooltip(data.key)}
        isDisabled={isDisabled}
      >
        <Popover content={tooltip
          ? <div dangerouslySetInnerHTML={{__html: html.sanitizeHtml(tooltip)}}/>
          : null}>
          {content}
        </Popover>
      </StyledSingleValueWrapper>
    </components.SingleValue>
  )
}

SingleValue.propTypes = {
  children: PropTypes.node,
  data: PropTypes.object,
  isDisabled: PropTypes.bool,
  selectProps: PropTypes.shape({
    tooltips: PropTypes.objectOf(PropTypes.string),
    loadTooltip: PropTypes.func,
    DetailLink: PropTypes.func
  })
}

export default SingleValue
