import React from 'react'
import PropTypes from 'prop-types'
import {components} from 'react-select'
import _get from 'lodash/get'
import styled from 'styled-components'

import Popover from '../Popover'
import ClickableWrapper from './ClickableWrapper'
import {theme} from '../utilStyles'

const StyledSingleValueWrapper = styled.div`
  color: ${({isDisabled}) => isDisabled ? theme.color('text') : 'inherit'};
`

export const SingleValue = props => {
  const {data, selectProps, isDisabled, children} = props
  const {tooltips, loadTooltip, valueLinkFactory} = selectProps
  const tooltip = _get(tooltips, data.key, null)

  const content = valueLinkFactory
    ? <ClickableWrapper onMouseDown={e => e.stopPropagation()}>
      {valueLinkFactory(data.key, children)}
    </ClickableWrapper>
    : children

  return <components.SingleValue {...props}>
    <StyledSingleValueWrapper
      onMouseOver={() => loadTooltip && !tooltip && loadTooltip(data.key)}
      isDisabled={isDisabled}
    >
      <Popover content={tooltip
        ? <div dangerouslySetInnerHTML={{__html: tooltip}}/>
        : null}>
        {content}
      </Popover>
    </StyledSingleValueWrapper>
  </components.SingleValue>
}

SingleValue.propTypes = {
  children: PropTypes.node,
  data: PropTypes.object,
  isDisabled: PropTypes.bool,
  selectProps: PropTypes.shape({
    tooltips: PropTypes.objectOf(PropTypes.string),
    loadTooltip: PropTypes.func,
    valueLinkFactory: PropTypes.func
  })
}

export default SingleValue
