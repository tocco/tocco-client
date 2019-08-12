import React from 'react'
import PropTypes from 'prop-types'
import {components} from 'react-select'
import _get from 'lodash/get'

import Popover from '../Popover'
import ClickableWrapper from './ClickableWrapper'

export const SingleValue = props => {
  const {data} = props
  const {tooltips, loadTooltip, valueLinkFactory} = props.selectProps
  const tooltip = _get(tooltips, data.key, null)

  const content = valueLinkFactory
    ? <ClickableWrapper onMouseDown={e => e.stopPropagation()}>
      {valueLinkFactory(data.key, props.children)}
    </ClickableWrapper>
    : props.children

  return <components.SingleValue {...props}>
    <div onMouseOver={() => loadTooltip && !tooltip && loadTooltip(data.key)}>
      <Popover content={tooltip ? <div dangerouslySetInnerHTML={{__html: tooltip}}/> : null}>
        {content}
      </Popover>
    </div>
  </components.SingleValue>
}

SingleValue.propTypes = {
  children: PropTypes.node,
  data: PropTypes.object,
  selectProps: PropTypes.shape({
    tooltips: PropTypes.objectOf(PropTypes.string),
    loadTooltip: PropTypes.func,
    valueLinkFactory: PropTypes.func
  })
}

export default SingleValue
