import React from 'react'
import {actions as toastrActions, reducer as toastrReducer} from 'react-redux-toastr'
import {FormattedMessage} from 'react-intl'
import storeFactory from '../storeFactory'
import sagas from './sagas'

export function getToastrNotifyAction(type, title, message, icon, timeOut) {
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

  if (icon) {
    options.icon = (<div className={`fa fa-${icon} icon`}/>)
  }

  if (timeOut) {
    options.timeOut = timeOut
  }

  return toastrActions.add({
    type,
    position: 'top-right',
    options
  })
}

export function getToastrConfirmation(message, okText, cancelText, onOk, onCancel) {
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
    storeFactory.injectReducers(store, {toastr: toastrReducer})
  }
  store.sagaMiddleware.run(sagas, accept)
}
