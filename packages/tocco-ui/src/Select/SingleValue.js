import React from 'react'
import PropTypes from 'prop-types'
import {components} from 'react-select'
import _get from 'lodash/get'

import Popover from '../Popover'

export const SingleValue = ({children, tooltips, loadTooltip, data, ...props}) => {
  const tooltip = _get(tooltips, data.key, null)

  return <components.SingleValue {...props}>
    <div onMouseOver={() => loadTooltip && !tooltip && loadTooltip(data.key)}>
      <Popover content={tooltip ? <div dangerouslySetInnerHTML={{__html: tooltip}}/> : null}>
        {children}
      </Popover>
    </div>
  </components.SingleValue>
}

SingleValue.propTypes = {
  children: PropTypes.node,
  tooltips: PropTypes.objectOf(PropTypes.string),
  loadTooltip: PropTypes.func,
  data: PropTypes.object
}

export default SingleValue
