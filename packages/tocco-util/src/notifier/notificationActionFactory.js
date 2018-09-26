import React from 'react'
import PropTypes from 'prop-types'
import {actions as toastrActions} from 'react-redux-toastr'
import _isString from 'lodash/isString'
import uuid from 'uuid/v4'
import {Icon} from 'tocco-ui'

import {modalComponent} from './modules/actions'
import ModalButtons from './modules/modalComponents/ModalButtons'
import TitleMessage from './components/TitleMessage'

const NotificationIcon = icon => <Icon icon={ _isString(icon) ? icon : 'exclamation-triangle'} size="3x" />

export function getInfoAction(type, title, message, icon, timeOut) {
  const options = {
    timeOut: timeOut,
    showCloseButton: true,
    component: () => <TitleMessage title={title} message={message}/>
  }

  options.icon = <NotificationIcon icon={icon} />

  return toastrActions.add({
    type,
    options
  })
}

export function getConfirmationAction(title, message, okText, cancelText, onOk, onCancel) {
  const id = uuid()

  const Content = ({close}) => {
    const buttons = [{
      label: okText,
      primary: true,
      callback: onOk
    }, {
      label: cancelText,
      callback: () => {
        onCancel()
        close()
      }
    }]
    return <ModalButtons buttons={buttons} />
  }

  Content.propTypes = {close: PropTypes.func.isRequired}

  return modalComponent(
    id,
    title,
    message,
    Content,
    false
  )
}

export function getYesNoAction(title, message, yesText, noText, cancelText, onYes, onNo, onCancel) {
  const id = uuid()

  const Content = ({close}) => {
    const buttons = [{
      label: yesText,
      primary: true,
      callback: onYes
    }, {
      label: noText,
      callback: onNo
    }, {
      label: cancelText,
      callback: () => {
        onCancel()
        close()
      }
    }]

    Content.propTypes = {close: PropTypes.func.isRequired}

    return <ModalButtons buttons={buttons} />
  }

  return modalComponent(
    id,
    title,
    message,
    Content,
    false
  )
}

export function getBlockingInfo(id, title, message, icon) {
  const options = {
    timeOut: 0,
    showCloseButton: false,
    attention: true,
    onAttentionClick: () => {},
    component: () => <TitleMessage title={title} message={message}/>
  }

  options.icon = <NotificationIcon icon={icon} />

  return toastrActions.add({
    id,
    type: 'info',
    position: 'top-center',
    options
  })
}
