import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs} from '@storybook/addon-knobs'
import {Provider} from 'react-redux'
import {Button} from 'tocco-ui'

import Readme from './README.md'
import notifier from '../notifier'
import appFactory from '../appFactory'
import errorLogging from './'

class Story extends React.Component {
  constructor(props) {
    super(props)
    this.store = appFactory.createStore({}, undefined, {}, 'errorLogging')
    errorLogging.addToStore(this.store, true, ['console', 'remote', 'notifier'])
    notifier.addToStore(this.store, true)
  }

  logError = () => {
    this.store.dispatch(errorLogging.logError('client.errorTitle', 'client.errorDescription', new Error('Some Error')))
  }

  render() {
    return (
      <Provider store={this.store}>
        <div>
          <notifier.Notifier/>
          <Button
            label="Log Error"
            look="raised"
            onClick={this.logError}
          />
        </div>
      </Provider>
    )
  }
}

storiesOf('App-Extensions|ErrorLogging', module)
  .addDecorator(withKnobs)
  .add(
    'Basic',
    () => <Story/>,
    {info: {disable: true}, notes: Readme}
  )
