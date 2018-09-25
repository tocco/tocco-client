/* eslint-disable no-console */
import React from 'react'
import {Provider} from 'react-redux'
import {appFactory, notifier} from 'tocco-util'
import {Button, ButtonGroup, Typography} from 'tocco-ui'
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
    this.store.dispatch(notifier.info(
      'info', <Typography.H4>Typography component</Typography.H4>, 'string contains <b>html</b>', 'info', 2000))
  }

  success = () => {
    this.store.dispatch(notifier.info('success', 'client.title', 'Lorem Ipsum', 'thumbs-up', 0))
  }

  warning = () => {
    this.store.dispatch(notifier.info('warning', 'client.title', longText, 'exclamation-triangle'))
  }

  error = () => {
    this.store.dispatch(notifier.info('error', 'client.title', 'client.description', 'exclamation-triangle', 10000))
  }

  confirmQuestion = () => {
    this.store.dispatch(notifier.confirm(
      'Title',
      'Message Line',
      'OK text',
      'Cancel text',
      () => console.log('Ok was pressed'),
      () => console.log('Cancel was pressed')
    ))
  }

  yesNoQuestion = () => {
    this.store.dispatch(notifier.yesNoQuestion(
      <Typography.H5>Title</Typography.H5>,
      <React.Fragment>
        <Typography.P>Message
          <Typography.B> Line 1</Typography.B>
        </Typography.P>
        <Typography.P>Message Line 2</Typography.P>
      </React.Fragment>,
      'Yes text',
      'No text',
      'Cancel text',
      () => console.log('Yes was pressed'),
      () => console.log('No was pressed'),
      () => console.log('Cancel was pressed')
    ))
  }

  blockingInfo = () => {
    const id = Date.now()
    this.store.dispatch(notifier.blockingInfo(
      id,
      'Title',
      'Please wait',
      'hand-paper'
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
      'Message',
      props => (
        <React.Fragment>
          <Typography.P>Custom component starts here</Typography.P>
          <ButtonGroup look="raised">
            <Button
              ink="primary"
              label="Primary action"
              onClick={() => console.log('Primary action was pressed')}
            />
            <Button
              label="Secondary action"
              onClick={() => console.log('Secondary action was pressed')}
            />
          </ButtonGroup>
        </React.Fragment>
      ),
      true
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
            <Button
              label="Info"
              look="raised"
              onClick={this.info}/>&nbsp;
            <Button
              label="Success (no timeout)"
              look="raised"
              onClick={this.success}/>&nbsp;
            <Button
              label="Warning (long)"
              look="raised"
              onClick={this.warning}/>&nbsp;
            <Button
              label="Error"
              look="raised"
              onClick={this.error}/>&nbsp;
            <Button
              label="Blocking Info"
              look="raised"
              onClick={this.blockingInfo}/>
          </div>
          <br/>
          <div>
            <Button
              label="Confirm"
              look="raised"
              onClick={this.confirmQuestion}/>&nbsp;
            <Button
              label="Yes-No Question"
              look="raised"
              onClick={this.yesNoQuestion}/>&nbsp;
            <Button
              label="Modal Component"
              look="raised"
              onClick={this.modalComponent}/>
          </div>
        </div>
      </Provider>
    )
  }
}
/* end example */

export default () => <Example/>
