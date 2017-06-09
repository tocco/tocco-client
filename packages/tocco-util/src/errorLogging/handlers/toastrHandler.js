import React from 'react'
import {put} from 'redux-saga/effects'
import {actions as toastrActions} from 'react-redux-toastr'
import {FormattedMessage} from 'react-intl'

export default function* toastr(title, description, error) {
  yield put(toastrActions.add({
    type: 'error',
    position: 'top-right',
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
      icon: (<div className={`fa fa-exclamation-circle icon`}/>),
      timeOut: 0,
      showCloseButton: true
    }
  }))
}
