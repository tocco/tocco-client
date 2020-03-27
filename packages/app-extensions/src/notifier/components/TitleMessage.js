import React from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {FormattedValue, Typography} from 'tocco-ui'
import _isString from 'lodash/isString'

const containsHtml = s => s && /<\/?[a-zA-Z0-9]*\/?>/.test(s)
const isKey = s => s && s.startsWith('client.')

const Content = props => {
  const {content} = props
  return _isString(content)
    ? containsHtml(content)
      ? <FormattedValue type="html" value={content}/>
      : isKey(content)
        ? <props.tag><FormattedMessage id={content}/></props.tag>
        : <props.tag>{content}</props.tag>
    : content.type && content.type.displayName === 'FormattedMessage'
      ? <props.tag>{content}</props.tag>
      : content
}

Content.defaultProps = {
  tag: Typography.P
}

Content.propTypes = {
  /**
   * Provide a component, a string or a translation key. HTNML in strings is allowed and styled properly.
   */
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /**
   * Translations and strings which not contain HTML are wrapped in passed in tag. Default is 'Typography.P'
   */
  tag: PropTypes.func
}

const TitleMessage = ({title, message, children}) => {
  return (
    <>
      {title && <div className="title-wrapper">
        <Content content={title} tag={Typography.H1} />
      </div>}
      {message && <Content content={message} />}
      {children}
    </>
  )
}

TitleMessage.propTypes = {
  /**
   * Provide a component, a string or a translation key optionally.
   * Strings and translation keys are rendered as <h4>.
   */
  title: PropTypes.node,
  /**
   * Provide a component, a string or a translation key optionally.
   * Strings and translation keys are rendered as <p>.
   */
  message: PropTypes.node,
  children: PropTypes.node
}

export {
  TitleMessage as default,
  Content
}
