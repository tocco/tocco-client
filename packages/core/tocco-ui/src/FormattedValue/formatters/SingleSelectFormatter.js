import _get from 'lodash/get'
import PropTypes from 'prop-types'
import {js, html} from 'tocco-util'

import Popover from '../../Popover'
import Typography from '../../Typography'

const SingleSelectFormatter = ({value, options, breakWords}) => {
  value = js.getOrFirst(value)
  const display = <Typography.Span breakWords={breakWords}>{value.display}</Typography.Span>

  const {tooltips, loadTooltip, navigationStrategy, linkProps} = options || {}
  const tooltip = _get(tooltips, value.key, null)

  const linkedDisplay = navigationStrategy?.DetailLink ? (
    <span onClick={e => e.stopPropagation()}>
      <navigationStrategy.DetailLink {...linkProps} entityKey={value.key}>
        <Popover content={tooltip ? <div dangerouslySetInnerHTML={{__html: html.sanitizeHtml(tooltip)}} /> : null}>
          <span onMouseOver={() => loadTooltip && !tooltip && loadTooltip(value.key)}>{display}</span>
        </Popover>
      </navigationStrategy.DetailLink>
    </span>
  ) : null

  return linkedDisplay || display
}

const valuePropType = PropTypes.shape({
  display: PropTypes.string,
  key: PropTypes.string
})

SingleSelectFormatter.propTypes = {
  value: PropTypes.oneOfType([valuePropType, PropTypes.arrayOf(valuePropType)]),
  options: PropTypes.shape({
    navigationStrategy: PropTypes.object,
    linkProps: PropTypes.object,
    tooltips: PropTypes.objectOf(PropTypes.string),
    loadTooltip: PropTypes.func
  }),
  breakWords: PropTypes.bool
}

export default SingleSelectFormatter
