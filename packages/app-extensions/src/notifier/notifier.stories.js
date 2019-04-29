import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs} from '@storybook/addon-knobs'
import {action} from '@storybook/addon-actions'
import {Provider} from 'react-redux'
import {Button, ButtonGroup, Typography} from 'tocco-ui'

import Readme from './README.md'
import notifier from './'
import appFactory from '../appFactory'

const longText = `Lorem ipsum dolor sit amet, at sed inermis intellegam scriptorem, usu facete apeirian ad. 
Sit et meliore intellegam. Mel cu maluisset philosophia, pri et habeo oportere. Vis in purto verear luptatum, has
ne graecis qualisque. Mei ei placerat incorrupte adversarium, eum rebum nonumy ut.`

const title = <Typography.H4>Main title <Typography.Small>additional byline</Typography.Small></Typography.H4>

const message = <React.Fragment>
  <Typography.P>Message
    <Typography.B> Line 1</Typography.B>
  </Typography.P>
  <Typography.P>Message Line 2</Typography.P>
</React.Fragment>

class Story extends React.Component {
  constructor(props) {
    super(props)
    this.store = appFactory.createStore({}, undefined, {}, 'notifier')
    notifier.addToStore(this.store, true)
  }

  info1 = () => {
    this.store.dispatch(notifier.info('info', 'client.title', 'client.message', ['far', 'thumbs-up'], 2000))
  }

  info2 = () => {
    this.store.dispatch(notifier.info('info', title, 'message line contains <b>html</b>'))
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
      action('Ok'),
      action('Cancel')
    ))
  }

  yesNoQuestion = () => {
    this.store.dispatch(notifier.yesNoQuestion(
      title,
      message,
      'Yes text',
      'No text',
      'Cancel text',
      action('Yes'),
      action('No'),
      action('Cancel')
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
              onClick={action('Primary action')}
            />
            <Button
              label="Secondary action (and close)"
              onClick={() => { action('Secondary action')(); props.close() }}
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

storiesOf('App-Extensions|Notifier', module)
  .addDecorator(withKnobs)
  .add(
    'Basic',
    () => <Story/>,
    {info: {disable: true}, notes: Readme}
  )
