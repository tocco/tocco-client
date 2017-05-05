import React from 'react'
import {put} from 'redux-saga/effects'
import {actions as toastrActions} from 'react-redux-toastr'
import {FormattedMessage} from 'react-intl'

export default function* toastr(type, title, description, error) {
  yield put(toastrActions.add({
    type: type,
    options: {
      component: () => (
        <div>
          <div className="title">
            <FormattedMessage id={title}/>
          </div>
          <div className="message">
            <FormattedMessage id={description}/>
          </div>
        </div>
      ),
      timeOut: type === 'error' ? 0 : 5000,
      showCloseButton: true
    }
  }))
}
