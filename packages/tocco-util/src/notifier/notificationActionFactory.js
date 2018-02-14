import React from 'react'
import {actions as toastrActions} from 'react-redux-toastr'

import TitleMessage from './components/TitleMessage'

export function getInfoAction(type, title, message, icon, timeOut) {
  const options = {
    timeOut: timeOut,
    showCloseButton: true,
    component: () => <TitleMessage title={title} message={message}/>
  }

  if (icon) {
    options.icon = (<div className={`fa fa-${icon} tocco-notifier__icon`}/>)
  }

  return toastrActions.add({
    type,
    options
  })
}

export function getConfirmationAction(title, message, okText, cancelText, onOk, onCancel) {
  return toastrActions.showConfirm({
    options: {
      component: () => <TitleMessage className="dialog" title={title} message={message}/>,
      okText,
      cancelText,
      onOk,
      onCancel
    }
  })
}

export function getYesNoAction(title, message, yesText, noText, cancelText, onYes, onNo, onCancel) {
  return toastrActions.showConfirm({
    options: {
      component: () => <TitleMessage className="dialog" title={title} message={message}/>,
      okText: yesText,
      cancelText,
      onOk: onYes,
      onCancel,
      buttons: [
        {
          ok: true
        },
        {
          text: noText,
          handler: onNo
        },
        {
          cancel: true
        }
      ]
    }
  })
}

export function getBlockingInfo(id, title, message, icon) {
  const options = {
    timeOut: 0,
    showCloseButton: false,
    transitionIn: 'bounceInDown',
    transitionOut: 'bounceOutUp',
    attention: true,
    onAttentionClick: () => {},
    component: () => <TitleMessage title={title} message={message}/>
  }

  if (icon) {
    options.icon = (<div className={`fa fa-${icon} tocco-notifier__icon`}/>)
  }

  return toastrActions.add({
    id,
    type: 'info',
    position: 'top-center',
    options
  })
}
