import _isString from 'lodash/isString'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {FormattedValue} from 'tocco-ui'

const containsHtml = s => s && /<\/?[a-zA-Z0-9]*\/?>/.test(s)
const isKey = s => s && s.startsWith('client.')

/**
 * Helper component to render either a plain string, a string containing HTML, a text resource (key) or any children
 */
const Content = ({children}) => {
  if (_isString(children)) {
    if (containsHtml(children)) {
      return <FormattedValue type="html" value={children} />
    } else if (isKey(children)) {
      return <FormattedMessage id={children} />
    }
    return <span>{children}</span>
  }

  return children
}

Content.propTypes = {
  children: PropTypes.any
}

export default Content
