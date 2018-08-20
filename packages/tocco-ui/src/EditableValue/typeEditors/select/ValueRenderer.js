import _get from 'lodash/get'
import Popover from '../../../Popover'
import React from 'react'
import PropTypes from 'prop-types'

const ValueRenderer = ({tooltips, option, loadTooltip, onValueClick}) => {
  const tooltip = _get(tooltips, option.key, null)

  const handleValueClick = e => {
    if (onValueClick) {
      onValueClick(option)
    }
  }

  return <div onMouseOver={() => loadTooltip && !tooltip && loadTooltip(option.key)}>
    <Popover
      content={tooltip ? <div dangerouslySetInnerHTML={{__html: tooltip}}/> : null}
    >
      <span id="value" onClick={handleValueClick}>{option.display}</span>
    </Popover>
  </div>
}

ValueRenderer.propTypes = {
  option: PropTypes.shape({
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    display: PropTypes.string
  }).isRequired,
  tooltips: PropTypes.object,
  loadTooltip: PropTypes.func,
  onValueClick: PropTypes.func
}

export default ValueRenderer
