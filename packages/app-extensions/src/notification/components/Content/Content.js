import React from 'react'
import {FormattedMessage} from 'react-intl'
import {FormattedValue} from 'tocco-ui'
import _isString from 'lodash/isString'

const containsHtml = s => s && /<\/?[a-zA-Z0-9]*\/?>/.test(s)
const isKey = s => s && s.startsWith('client.')

/**
 * Helper component to render either a plain string, a string containing HTML, a text resource (key) or any children
 */
const Content = ({children}) => _isString(children)
  ? containsHtml(children)
      ? <FormattedValue type="html" value={children}/>
      : isKey(children)
        ? <FormattedMessage id={children}/>
        : <span>{children}</span>
  : children

export default Content
