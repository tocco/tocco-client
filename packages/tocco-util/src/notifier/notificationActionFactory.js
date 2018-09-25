import React from 'react'
import {actions as toastrActions} from 'react-redux-toastr'
import _isString from 'lodash/isString'
import {Icon} from 'tocco-ui'

import {modalComponent} from './modules/actions'
import OkCancelButtons from './modules/modalComponentsTemplates/OkCancelButtons'
import YesNoCancelButtons from './modules/modalComponentsTemplates/YesNoCancelButtons'
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
  const getConfirmationActionProps = {okText, cancelText, onOk, onCancel}
  const id = Date.now()
  return modalComponent(
    id,
    title,
    message,
    props => <OkCancelButtons {...getConfirmationActionProps} close={props.close}/>,
    false
  )
}

export function getYesNoAction(title, message, yesText, noText, cancelText, onYes, onNo, onCancel) {
  const getYesNoActionProps = {yesText, noText, cancelText, onYes, onNo, onCancel}
  const id = Date.now()
  return modalComponent(
    id,
    title,
    message,
    props => <YesNoCancelButtons {...getYesNoActionProps} close={props.close}/>,
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
