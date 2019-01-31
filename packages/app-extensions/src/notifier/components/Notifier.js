import React from 'react'
import PropTypes from 'prop-types'
import ReduxToastr from 'react-redux-toastr'
import _debounce from 'lodash/debounce'

import {defaultToastrOptions} from '../notifier'
import ModalDisplayContainer from '../modules/modalComponents/ModalDisplayContainer'
import {StyledNotifier} from './StyledNotifier'

class Notifier extends React.Component {
  componentDidMount() {
    window.addEventListener('mousemove', this.debouncedHandleEvent)
    window.addEventListener('touchstart', this.debouncedHandleEvent)
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.debouncedHandleEvent)
    window.removeEventListener('touchstart', this.debouncedHandleEvent)
  }

  handleEvent = e => {
    if (this.props.hasNotifications) {
      this.props.userActive()
    }
  }

  debouncedHandleEvent = _debounce(this.handleEvent, 300)

  render() {
    return (
      <StyledNotifier>
        <div className="tocco-notifier">
          <ReduxToastr {...this.props.toastrOptions} />
          <ModalDisplayContainer/>
        </div>
      </StyledNotifier>
    )
  }
}

Notifier.defaultProps = {
  toastrOptions: defaultToastrOptions
}

Notifier.propTypes = {
  toastrOptions: PropTypes.object,
  hasNotifications: PropTypes.bool,
  userActive: PropTypes.func.isRequired
}

export default Notifier
