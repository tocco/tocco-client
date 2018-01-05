import React from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {FormattedValue} from 'tocco-ui'

const TitleMessage = ({title, message, className, children}) => {
  const isKey = s => s && s.startsWith('client.')
  return (
    <div className={className}>
      <h1>
        {isKey(title) ? <FormattedMessage id={title}/> : <FormattedValue type="html" value={title}/>}
      </h1>
      {message
      && <div className="message">
        {isKey(message) ? <FormattedMessage id={message}/> : <FormattedValue type="html" value={message}/>}
      </div>}
      {children}
    </div>
  )
}

TitleMessage.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
  children: PropTypes.node
}

export default TitleMessage
