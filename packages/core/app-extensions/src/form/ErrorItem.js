import PropTypes from 'prop-types'
import {FormattedValue} from 'tocco-ui'

export const ErrorItem = ({message}) => (
  <div>
    <FormattedValue type="html" value={message} />
  </div>
)

ErrorItem.propTypes = {
  message: PropTypes.string.isRequired
}
