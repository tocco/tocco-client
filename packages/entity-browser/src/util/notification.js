import React from 'react'
import {put} from 'redux-saga/effects'
import {actions as toastrActions} from 'react-redux-toastr'

export function* notify(type, title, message, glyphicon, timeOut) {
  const options = {
    showCloseButton: true
  }
  if (glyphicon) {
    options.icon = (<h1 className={`glyphicon glyphicon-${glyphicon}`}/>)
  }

  if (timeOut) {
    options.timeOut = timeOut
  }

  yield put(toastrActions.add({
    type,
    title,
    message,
    options
  }))
}
