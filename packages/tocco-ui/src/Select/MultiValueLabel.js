import React from 'react'
import PropTypes from 'prop-types'
import {components} from 'react-select'
import _get from 'lodash/get'

import Popover from '../Popover'

export const MultiValueLabel = props => {
  const {tooltips, data, loadTooltip} = props
  const tooltip = _get(tooltips, data.key, null)

  return (
    <Popover content={tooltip ? <div dangerouslySetInnerHTML={{__html: tooltip}}/> : null}>
      <span onMouseOver={() => loadTooltip && !tooltip && loadTooltip(data.key)} >
        <components.MultiValueLabel {...props}/>
      </span>
    </Popover>
  )
}

MultiValueLabel.propTypes = {
  children: PropTypes.node,
  tooltips: PropTypes.objectOf(PropTypes.string),
  loadTooltip: PropTypes.func,
  data: PropTypes.object
}

export default MultiValueLabel
