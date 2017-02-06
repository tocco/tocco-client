import {put} from 'redux-saga/effects'
import {actions as toastrActions} from 'react-redux-toastr'
import {FormattedMessage} from 'react-intl'
import React from 'react'

export default function* toastr(type, title, error) {
  yield put(toastrActions.add({
    type: type,
    options: {
      component: () => (
        <div>
          <div className="title">
            <FormattedMessage id={`client.error.${title}`} defaultMessage={title}/>
          </div>
          <div className="message">
            <FormattedMessage id={`client.error.${error}`} defaultMessage={error}/>
          </div>
        </div>
      ),
      timeOut: type === 'error' ? 0 : 5000,
      showCloseButton: true
    }
  }))
}
