import React from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {FormattedValue, Typography} from 'tocco-ui'
import _isString from 'lodash/isString'

const containsHtml = s => s && /<\/?[a-zA-Z0-9]*\/?>/.test(s)
const isKey = s => s && s.startsWith('client.')

/**
 * Format content correctly
 * @param  {string|object} content can be a React component, a translation key or string may containing html
 * @param  {boolean} isTitle wraps non html strings into H4 or P
 * @return {object} React component
 */
const Content = ({content, isTitle}) => {
  if (_isString(content)) {
    if (containsHtml(content)) {
      content = <FormattedValue type="html" value={content}/>
    } else {
      content = isKey(content) ? <FormattedMessage id={content}/> : content
      content = isTitle ? <Typography.H4>{content}</Typography.H4> : <Typography.P>{content}</Typography.P>
    }
  }
  return content
}

Content.propTypes = {
  content: PropTypes.node
}

const TitleMessage = ({title, message, children}) => {
  return (
    <React.Fragment>
      {title && <Content content={title} isTitle={true} />}
      {message && <Content content={message} />}
      {children}
    </React.Fragment>
  )
}

TitleMessage.propTypes = {
  className: PropTypes.string,
  title: PropTypes.node,
  message: PropTypes.node,
  children: PropTypes.node
}

export {
  TitleMessage as default,
  Content
}
