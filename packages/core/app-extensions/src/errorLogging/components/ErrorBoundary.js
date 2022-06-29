import PropTypes from 'prop-types'
import {Component} from 'react'
import {ErrorBoundaryFallback} from 'tocco-ui'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {hasError: false, error: null}
  }

  static getDerivedStateFromError(error) {
    return {hasError: true, error}
  }

  componentDidCatch(error) {
    const {logError, intl} = this.props
    logError(
      intl.formatMessage({id: 'client.component.errorBoundary.notificationTitle'}),
      intl.formatMessage({id: 'client.component.errorBoundary.notificationDescription'}),
      error
    )
  }

  render() {
    if (this.state.hasError) {
      return <ErrorBoundaryFallback />
    }

    return this.props.children || null
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.any,
  intl: PropTypes.object.isRequired,
  logError: PropTypes.func.isRequired
}

export default ErrorBoundary
