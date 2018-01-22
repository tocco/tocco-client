import React from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {FormattedValue} from 'tocco-ui'
import _isString from 'lodash/isString'

const isKey = s => s && s.startsWith('client.')

const Content = ({content}) =>
  _isString(content)
    ? (isKey(content) ? <FormattedMessage id={content}/> : <FormattedValue type="html" value={content}/>)
    : content

Content.propTypes = {
  content: PropTypes.node
}

const TitleMessage = ({title, message, className, children}) => {
  return (
    <div className={className}>
      <h1>
        <Content content={title}/>
      </h1>
      {message
      && <div className="message">
        <Content content={message}/>
      </div>}
      {children}
    </div>
  )
}

TitleMessage.propTypes = {
  className: PropTypes.string,
  title: PropTypes.node,
  message: PropTypes.node,
  children: PropTypes.node
}

export default TitleMessage
