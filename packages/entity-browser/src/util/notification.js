import React from 'react'
import {put} from 'redux-saga/effects'
import {actions as toastrActions} from 'react-redux-toastr'
import {FormattedMessage} from 'react-intl'

export function createNotificationAction(type, title, message, glyphicon, timeOut) {
  const options = {
    showCloseButton: true,
    component: () => (
      <div>
        <div className="title">
          <FormattedMessage id={title}/>
        </div>
        <div className="message">
          <FormattedMessage id={message}/>
        </div>
      </div>
    )
  }
  if (glyphicon) {
    options.icon = (<div className={`glyphicon glyphicon-${glyphicon} icon`}/>)
  }

  if (timeOut) {
    options.timeOut = timeOut
  }

  return toastrActions.add({
    type,
    options
  })
}

export function createConfirmationAction(message, okText, cancelText, onOk, onCancel) {
  return toastrActions.showConfirm({
    message,
    options: {
      okText,
      cancelText,
      onOk,
      onCancel
    }
  })
}

export function* notify(type, title, message, glyphicon, timeOut) {
  const action = createNotificationAction(type, title, message, glyphicon, timeOut)
  yield put(action)
}

export function* confirm(message, okText, cancelText, onOk, onCancel) {
  const action = createConfirmationAction(message, okText, cancelText, onOk, onCancel)
  yield put(action)
}
