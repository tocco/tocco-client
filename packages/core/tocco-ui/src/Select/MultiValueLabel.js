import _get from 'lodash/get'
import PropTypes from 'prop-types'
import {html} from 'tocco-util'

import Popover from '../Popover'
import ClickableWrapper from './ClickableWrapper'
import {StyledMultiValueLabelWrapper} from './StyledComponents'

export const MultiValueLabel = props => {
  const {data, innerProps, children} = props
  const {tooltips, loadTooltip, DetailLink} = props.selectProps
  const tooltip = _get(tooltips, data.key, null)

  const Children = <span {...innerProps}>{children}</span>

  const content = DetailLink ? (
    <ClickableWrapper
      onMouseDown={e => {
        e.stopPropagation()
        e.preventDefault()
      }}
    >
      <DetailLink entityKey={data.key}>
        <Popover content={tooltip ? <div dangerouslySetInnerHTML={{__html: html.sanitizeHtml(tooltip)}} /> : null}>
          <span onMouseOver={() => loadTooltip && !tooltip && loadTooltip(data.key)}>{Children}</span>
        </Popover>
      </DetailLink>
    </ClickableWrapper>
  ) : (
    Children
  )

  return <StyledMultiValueLabelWrapper>{content}</StyledMultiValueLabelWrapper>
}

MultiValueLabel.propTypes = {
  data: PropTypes.object,
  children: PropTypes.any,
  innerProps: PropTypes.object,
  selectProps: PropTypes.shape({
    tooltips: PropTypes.objectOf(PropTypes.string),
    loadTooltip: PropTypes.func,
    DetailLink: PropTypes.elementType
  })
}

export default MultiValueLabel
