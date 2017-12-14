import React from 'react'

import {actions as toastrActions, reducer as toastrReducer} from 'react-redux-toastr'
import {FormattedMessage} from 'react-intl'
import appFactory from '../appFactory'
import {FormattedValue} from 'tocco-ui'
import sagas from './sagas'
import '!style-loader!css-loader!react-redux-toastr/lib/css/react-redux-toastr.min.css'
import PropTypes from 'prop-types'

const TitleMessageNotification = ({title, message}) => {
  const isKey = s => s && s.startsWith('client.')
  return (
    <div>
      <div className="title">
        {isKey(title) ? <FormattedMessage id={title}/> : <span>{title}</span>}
      </div>
      {message
      && <div className="message">
        {isKey(message) ? <FormattedMessage id={message}/> : <span>{message}</span>}
      </div>}
    </div>
  )
}

TitleMessageNotification.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string
}

const TitleMessageDialog = ({title, message}) => {
  return (
    <div className="dialog">
      <div>
        <h1>{title}</h1>
      </div>
      <div>
        <FormattedValue type="html" value={message}/>
      </div>
    </div>
  )
}

TitleMessageDialog.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string
}

export function getInfoAction(type, title, message, icon, timeOut) {
  const options = {
    timeOut: timeOut,
    showCloseButton: true,
    component: () => <TitleMessageNotification title={title} message={message}/>
  }

  if (icon) {
    options.icon = (<div className={`fa fa-${icon} icon`}/>)
  }

  return toastrActions.add({
    type,
    options
  })
}

export function getConfirmationAction(title, message, okText, cancelText, onOk, onCancel) {
  return toastrActions.showConfirm({
    options: {
      component: () => (<TitleMessageDialog title={title} message={message}/>),
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
      component: () => (<TitleMessageDialog title={title} message={message}/>),
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
    attention: false,
    component: () => <TitleMessageNotification title={title} message={message}/>
  }

  if (icon) {
    options.icon = (<div className={`fa fa-${icon} icon`}/>)
  }

  return toastrActions.add({
    id,
    type: 'info',
    position: 'top-center',
    options
  })
}

export const defaultToastrOptions = {
  newestOnTop: false,
  preventDuplicates: false,
  position: 'top-right',
  progressBar: true,
  transitionOut: 'fadeOut'
}

export const addToStore = (store, accept) => {
  if (accept) {
    appFactory.injectReducers(store, {toastr: toastrReducer})
  }
  store.sagaMiddleware.run(sagas, accept)
}
