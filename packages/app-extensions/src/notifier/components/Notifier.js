import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import ReduxToastr from 'react-redux-toastr'
import _debounce from 'lodash/debounce'

import {defaultToastrOptions} from '../notifier'
import ModalDisplayContainer from '../modules/modalComponents/ModalDisplayContainer'
import {StyledNotifier} from './StyledNotifier'

const Notifier = ({hasNotifications, userActive, toastrOptions}) => {
  const debouncedHandleEvent = () => _debounce(handleEvent, 300)
  const handleEvent = () => {
    if (hasNotifications) {
      userActive()
    }
  }

  useEffect(() => {
    window.addEventListener('mousemove', debouncedHandleEvent)
    window.addEventListener('touchstart', debouncedHandleEvent)

    return () => {
      window.removeEventListener('mousemove', debouncedHandleEvent)
      window.removeEventListener('touchstart', debouncedHandleEvent)
    }
  }, [])

  return (
      <StyledNotifier>
        <div className="tocco-notifier">
          <ReduxToastr {...toastrOptions}/>
          <ModalDisplayContainer/>
        </div>
      </StyledNotifier>
  )
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
