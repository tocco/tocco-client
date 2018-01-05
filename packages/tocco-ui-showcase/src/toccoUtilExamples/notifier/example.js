/* eslint-disable no-console */
import React from 'react'
import {Provider} from 'react-redux'
import Button from '../../../../tocco-ui/src/Button'
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

  confirmQuestion = () => {
    this.store.dispatch(notifier.confirm(
      'Title',
      'Message Line 1<br/>Message Line 2',
      'OK Text',
      'Cancel Text',
      () => console.log('ok pressed'),
      () => console.log('cancel pressed')
    ))
  }

  yesNoQuestion = () => {
    this.store.dispatch(notifier.yesNoQuestion(
      'Title',
      'Message Line 1<br/>Message Line 2',
      'Yes Text',
      'No Text',
      'Cancel Text',
      () => console.log('yes pressed'),
      () => console.log('no pressed'),
      () => console.log('Cancel pressed')
    ))
  }

  blockingInfo = () => {
    const id = Date.now()
    this.store.dispatch(notifier.blockingInfo(
      id,
      'Title',
      'Please wait',
      'diamond fa-spin fa-3x fa-fw'
    ))

    setTimeout(() => {
      this.store.dispatch(notifier.removeBlockingInfo(id))
    }, 2000)
  }

  modalComponent = () => {
    const id = Date.now()
    this.store.dispatch(notifier.modalComponent(
      id,
      'Title',
      'Please wait',
      props => (
        <div style={{border: '1px dotted red'}}>
          <p>My Custom-Component</p>
          <Button onClick={props.close} label="close"/>
        </div>
      )
    ))

    setTimeout(() => {
      this.store.dispatch(notifier.removeBlockingInfo(id))
    }, 2000)
  }

  render() {
    return (
      <Provider store={this.store}>
        <div>
          <notifier.Notifier/>
          <div>
            <button className="btn btn-info" onClick={this.info}>Info</button>
            <button className="btn btn-success" onClick={this.success}>Success (no timeout)</button>
            <button className="btn btn-warning" onClick={this.warning}>Warning (long)</button>
            <button className="btn btn-danger" onClick={this.error}>Error</button>
            <button className="btn btn-info" onClick={this.blockingInfo}>Blocking Info</button>
          </div>
          <div>
            <button className="btn btn-default" onClick={this.confirmQuestion}>Confirm</button>
            <button className="btn btn-default" onClick={this.yesNoQuestion}>Yes-No Question</button>
            <button className="btn btn-default" onClick={this.modalComponent}>Modal Component</button>
          </div>
        </div>
      </Provider>
    )
  }
}
/* end example */

export default () => <Example/>
