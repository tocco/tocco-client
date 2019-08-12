import React from 'react'
import PropTypes from 'prop-types'
import {components} from 'react-select'
import _get from 'lodash/get'

import Popover from '../Popover'
import ClickableWrapper from './ClickableWrapper'

export const MultiValueLabel = props => {
  const {data} = props
  const {tooltips, loadTooltip, valueLinkFactory} = props.selectProps
  const tooltip = _get(tooltips, data.key, null)

  const content = valueLinkFactory
    ? <ClickableWrapper onMouseDown={e => e.stopPropagation()}>
      {valueLinkFactory(data.key, <components.MultiValueLabel {...props}/>)}
    </ClickableWrapper>
    : <components.MultiValueLabel {...props}/>

  return (
    <Popover content={tooltip ? <div dangerouslySetInnerHTML={{__html: tooltip}}/> : null}>
      <span onMouseOver={() => loadTooltip && !tooltip && loadTooltip(data.key)} >
        {content}
      </span>
    </Popover>
  )
}

MultiValueLabel.propTypes = {
  data: PropTypes.object,
  selectProps: PropTypes.shape({
    tooltips: PropTypes.objectOf(PropTypes.string),
    loadTooltip: PropTypes.func,
    valueLinkFactory: PropTypes.func
  })
}

export default MultiValueLabel
