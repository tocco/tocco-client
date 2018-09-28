/* eslint-disable no-console */
import React from 'react'
import {Provider} from 'react-redux'
import {appFactory, notifier} from 'tocco-util'
import {Button, ButtonGroup, Typography} from 'tocco-ui'
// real-import:import {appFactory, notifier} from 'tocco-util'

/* start example */
const longText = `Lorem ipsum dolor sit amet, at sed inermis intellegam scriptorem, usu facete apeirian ad.
Sit et meliore intellegam. Mel cu maluisset philosophia, pri et habeo oportere. Vis in purto verear luptatum, has
ne graecis qualisque. Mei ei placerat incorrupte adversarium, eum rebum nonumy ut.`

const TitleComponent = <Typography.H4>Main title <Typography.Small>additional byline</Typography.Small></Typography.H4>

const MessageComponent = <React.Fragment>
  <Typography.P>Message
    <Typography.B> Line 1</Typography.B>
  </Typography.P>
  <Typography.P>Message Line 2</Typography.P>
</React.Fragment>

class Example extends React.Component {
  constructor(props) {
    super(props)
    this.store = appFactory.createStore({}, undefined, {}, 'notifier')
    notifier.addToStore(this.store, true)
  }

  info1 = () => {
    this.store.dispatch(notifier.info(
      'info', 'client.title', 'client.message', ['far', 'thumbs-up'], 2000))
  }

  info2 = () => {
    this.store.dispatch(notifier.info('info', TitleComponent, 'message line contains <b>html</b>'))
  }

  success = () => {
    this.store.dispatch(notifier.info('success', 'client.title', 'client.message', null, 2000))
  }

  warning = () => {
    this.store.dispatch(notifier.info('warning', 'client.title', longText))
  }

  error = () => {
    this.store.dispatch(notifier.info('error', 'client.title', 'client.description'))
  }

  confirmQuestion = () => {
    this.store.dispatch(notifier.confirm(
      'Title',
      'message line contains <b>html</b>',
      'OK text',
      'Cancel text',
      () => console.log('Ok was pressed'),
      () => console.log('Cancel was pressed')
    ))
  }

  yesNoQuestion = () => {
    this.store.dispatch(notifier.yesNoQuestion(
      TitleComponent,
      MessageComponent,
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
      'Please wait'
    ))

    setTimeout(() => {
      this.store.dispatch(notifier.removeBlockingInfo(id))
    }, 5000)
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
              label="Info 1"
              look="raised"
              onClick={this.info1}/>&nbsp;
            <Button
              label="Info 2"
              look="raised"
              onClick={this.info2}/>&nbsp;
            <Button
              label="Success"
              look="raised"
              onClick={this.success}/>&nbsp;
            <Button
              label="Warning"
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
