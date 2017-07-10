import React from 'react'
import {Provider} from 'react-redux'
import ReduxToastr from 'react-redux-toastr'

import {appFactory, notifier} from 'tocco-util'
// real-import:import {appFactory, notifier} from 'tocco-util'

const longText = `Lorem ipsum dolor sit amet, at sed inermis intellegam scriptorem, usu facete apeirian ad. 
Sit et meliore intellegam. Mel cu maluisset philosophia, pri et habeo oportere. Vis in purto verear luptatum, has 
ne graecis qualisque. Mei ei placerat incorrupte adversarium, eum rebum nonumy ut.`

/* start example */
class Example extends React.Component {
  constructor(props) {
    super(props)

    this.store = appFactory.createStore({}, undefined, {}, 'notifier')
    notifier.addToStore(this.store, true)
  }

  info = () => {
    this.store.dispatch(notifier.info('info', 'client.title', 'client.description', 'bomb', 2000))
  }

  success = () => {
    this.store.dispatch(notifier.info('success', 'client.title', 'client.description', 'beer', 0))
  }

  warning = () => {
    this.store.dispatch(notifier.info('warning', 'client.title', longText, 'glass'))
  }

  error = () => {
    this.store.dispatch(notifier.info('error', 'client.title', 'client.description', 'blind', 10000))
  }

  render() {
    return (
      <Provider store={this.store}>
        <div>
          <ReduxToastr {...notifier.defaultToastrOptions}/>
          <button className="btn btn-info" onClick={this.info}>Info</button>
          <button className="btn btn-success" onClick={this.success}>Success (no timeout)</button>
          <button className="btn btn-warning" onClick={this.warning}>Warning (long)</button>
          <button className="btn btn-danger" onClick={this.error}>Error</button>
        </div>
      </Provider>
    )
  }
}
/* end example */

export default () => <Example/>
