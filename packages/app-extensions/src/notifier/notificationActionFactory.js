import React from 'react'
import PropTypes from 'prop-types'
import {actions as toastrActions} from 'react-redux-toastr'
import uuid from 'uuid/v4'
import {Icon, LoadingSpinner} from 'tocco-ui'

import {modalComponent} from './modules/actions'
import ModalButtons from './modules/modalComponents/ModalButtons'
import TitleMessage from './components/TitleMessage'

const typeIconMap = {
  error: 'times',
  info: 'info',
  success: 'check',
  warning: 'exclamation'
}

const isWarningOrError = type => type === 'warning' || type === 'error'
const doesNotTimeOut = timeOut => !(timeOut > 0)
const isNotWarningNorErrorAndDoesTimeOut = (type, timeOut) => type !== 'warning' && type !== 'error' && timeOut > 0

export function getInfoAction(uncheckedType, title, message, icon, timeOut) {
  const type = Object.keys(typeIconMap).includes(uncheckedType) ? uncheckedType : 'info'

  const options = {
    attention: false,
    component: () => <TitleMessage title={title} message={message}/>,
    icon: <Icon icon={icon || typeIconMap[type] || 'info'} style={{fontSize: '5rem'}}/>,
    preventDuplicates: true,
    removeOnHover: isNotWarningNorErrorAndDoesTimeOut(type, timeOut),
    removeOnHoverTimeOut: isWarningOrError(type) ? 0 : timeOut,
    showCloseButton: isWarningOrError(type) || doesNotTimeOut(timeOut),
    timeOut: isWarningOrError(type) ? 0 : timeOut,
    transitionIn: 'bounceIn'
  }

  return toastrActions.add({
    id: uuid(),
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
      callback: () => {
        onOk()
        close()
      }
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
      callback: () => {
        onYes()
        close()
      }
    }, {
      label: noText,
      callback: () => {
        onNo()
        close()
      }
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

export function getBlockingInfo(id, title, message) {
  const options = {
    attention: true,
    component: () => <TitleMessage title={title} message={message}/>,
    icon: <LoadingSpinner size="3em" />,
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
