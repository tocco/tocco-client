import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import {js, html} from 'tocco-util'

import Popover from '../../Popover'
import Typography from '../../Typography'

const SingleSelectFormatter = ({value, options, breakWords}) => {
  value = js.getOrFirst(value)
  const display = <Typography.Span breakWords={breakWords}>{value.display}</Typography.Span>

  const {tooltips, loadTooltip, DetailLink} = options || {}
  const tooltip = _get(tooltips, value.key, null)

  return DetailLink ? (
    <span onClick={e => e.stopPropagation()}>
      <Popover content={tooltip ? <div dangerouslySetInnerHTML={{__html: html.sanitizeHtml(tooltip)}} /> : null}>
        <span onMouseOver={() => loadTooltip && !tooltip && loadTooltip(value.key)}>
          <DetailLink entityKey={value.key}>{display}</DetailLink>
        </span>
      </Popover>
    </span>
  ) : (
    display
  )
}

const valuePropType = PropTypes.shape({
  display: PropTypes.string,
  key: PropTypes.string
})

SingleSelectFormatter.propTypes = {
  value: PropTypes.oneOfType([valuePropType, PropTypes.arrayOf(valuePropType)]),
  options: PropTypes.shape({
    DetailLink: PropTypes.func,
    tooltips: PropTypes.objectOf(PropTypes.string),
    loadTooltip: PropTypes.func
  }),
  breakWords: PropTypes.bool
}

export default SingleSelectFormatter
