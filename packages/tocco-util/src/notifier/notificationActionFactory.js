import React from 'react'
import PropTypes from 'prop-types'
import {actions as toastrActions} from 'react-redux-toastr'
import uuid from 'uuid/v4'
import {Icon, IconTocco} from 'tocco-ui'

import {modalComponent} from './modules/actions'
import ModalButtons from './modules/modalComponents/ModalButtons'
import TitleMessage from './components/TitleMessage'

const typeIconMap = {
  error: 'times',
  info: 'info',
  success: 'check',
  warning: 'exclamation'
}

export function getInfoAction(type, title, message, icon, timeOut) {
  type = Object.keys(typeIconMap).includes(type) ? type : 'info'

  const options = {
    attention: false,
    component: () => <TitleMessage title={title} message={message}/>,
    icon: <Icon icon={icon || typeIconMap[type] || 'info'} size="3x" />,
    preventDuplicates: true,
    removeOnHover: type !== 'warning' && type !== 'error' && timeOut > 0,
    removeOnHoverTimeOut: type === 'warning' || type === 'error' ? 0 : timeOut,
    showCloseButton: type === 'warning' || type === 'error' || !(timeOut > 0),
    timeOut: type === 'warning' || type === 'error' ? 0 : timeOut,
    transitionIn: 'bounceIn'
  }

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

export function getBlockingInfo(id, title, message, iconName) {
  const options = {
    attention: true,
    component: () => <TitleMessage title={title} message={message}/>,
    icon: iconName ? <Icon icon={iconName} size="3x" spin /> : <IconTocco size="3em" />,
    onAttentionClick: () => {},
    preventDuplicates: true,
    showCloseButton: false,
    timeOut: 0,
    transitionIn: 'fadeIn'
  }

  return toastrActions.add({
    id,
    type: 'info',
    position: 'top-center',
    options
  })
}
