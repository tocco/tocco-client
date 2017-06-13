import React from 'react'

import {actions as toastrActions, reducer as toastrReducer} from 'react-redux-toastr'
import {FormattedMessage} from 'react-intl'
import appFactory from '../appFactory'
import sagas from './sagas'

export function getInfoAction(type, title, message, icon, timeOut) {
  const options = {
    timeOut: timeOut,
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

  if (icon) {
    options.icon = (<div className={`fa fa-${icon} icon`}/>)
  }

  return toastrActions.add({
    type,
    position: 'top-right',
    options
  })
}

export function getConfirmationAction(message, okText, cancelText, onOk, onCancel) {
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

export const addToStore = (store, accept) => {
  if (accept) {
    appFactory.injectReducers(store, {toastr: toastrReducer})
  }
  store.sagaMiddleware.run(sagas, accept)
}
