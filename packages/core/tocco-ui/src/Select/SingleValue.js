import _get from 'lodash/get'
import _isString from 'lodash/isString'
import _omit from 'lodash/omit'
import _omitBy from 'lodash/omitBy'
import PropTypes from 'prop-types'
import {memo} from 'react'
import {components} from 'react-select'
import {html, js} from 'tocco-util'

import Popover from '../Popover'
import ClickableWrapper from './ClickableWrapper'
import {StyledSingleValueWrapper} from './StyledComponents'

/**
 * For better performance in tabbing through
 * React-Select fields on Safari the SingleValue should not
 * re-render onFocus and onBlur.
 * Re-render is triggered by the `DetailLink` component which could be ignored
 */
const ignoredAttributes = ['linkComp']
const areEqual = (prevProps, nextProps) => {
  const diff = js.difference(prevProps, nextProps)
  const clean = _omitBy(_omit(diff, ignoredAttributes), v => Object.keys(v).length === 0)
  return Object.entries(clean).length === 0
}

const Content = memo(
  ({linkComp: DetailLink, entityKey, children}) =>
    DetailLink && _isString(entityKey) ? (
      <ClickableWrapper
        onMouseDown={e => {
          e.stopPropagation()
          e.preventDefault()
        }}
      >
        <DetailLink entityKey={entityKey}>{children}</DetailLink>
      </ClickableWrapper>
    ) : (
      children
    ),
  areEqual
)

Content.propTypes = {
  children: PropTypes.node,
  entityKey: PropTypes.any,
  linkComp: PropTypes.func
}

export const SingleValue = props => {
  const {data, selectProps, isDisabled, children} = props
  const {tooltips, loadTooltip, DetailLink} = selectProps
  const tooltip = _get(tooltips, data.key, null)

  return (
    <components.SingleValue {...props}>
      <StyledSingleValueWrapper
        onMouseOver={() => loadTooltip && !tooltip && loadTooltip(data.key)}
        isDisabled={isDisabled}
      >
        <Popover content={tooltip ? <div dangerouslySetInnerHTML={{__html: html.sanitizeHtml(tooltip)}} /> : null}>
          <Content linkComp={DetailLink} entityKey={data.key}>
            {children}
          </Content>
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
