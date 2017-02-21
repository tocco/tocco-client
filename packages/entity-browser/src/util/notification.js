import React from 'react'
import {put} from 'redux-saga/effects'
import {actions as toastrActions} from 'react-redux-toastr'
import {FormattedMessage} from 'react-intl'

export function* notify(type, title, message, glyphicon, timeOut) {
  const options = {
    showCloseButton: true,
    component: () => (
      <div>
        <div className="title">
          <FormattedMessage id={`client.entity-browser.${title}`} defaultMessage={title}/>
        </div>
        <div className="message">
          <FormattedMessage id={`client.entity-browser.${message}`} defaultMessage={message}/>
        </div>
      </div>
    )
  }
  if (glyphicon) {
    options.icon = (<h1 className={`glyphicon glyphicon-${glyphicon}`}/>)
  }

  if (timeOut) {
    options.timeOut = timeOut
  }

  yield put(toastrActions.add({
    type,
    options
  }))
}
