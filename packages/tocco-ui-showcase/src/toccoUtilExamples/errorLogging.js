import React from 'react'
import {Provider} from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
import {appFactory, errorLogging, notifier} from 'tocco-util'
// real-import:import {appFactory, errorLogging, notifier} from 'tocco-util'

/* start example */
class Example extends React.Component {
  constructor(props) {
    super(props)
    this.store = appFactory.createStore({}, undefined, {}, 'errorLogging')
    errorLogging.addToStore(this.store, true, ['console', 'remote', 'toastr'])
    notifier.addToStore(this.store, true)
  }

  logError = () => {
    this.store.dispatch(errorLogging.logError('client.errorTitle', 'client.errorDescription', new Error('Some Error')))
  }

  render() {
    return (
      <Provider store={this.store}>
        <div>
          <ReduxToastr {...notifier.defaultToastrOptions} position="top-center" />
          <button className="btn btn-danger" onClick={this.logError}>Log Error</button>
        </div>
      </Provider>
    )
  }
}
/* end example */

export default () => <Example/>
