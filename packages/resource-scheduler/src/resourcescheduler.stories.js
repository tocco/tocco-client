import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, select} from '@storybook/addon-knobs'

import {ResourceSchedulerApp} from './main'

storiesOf('Apps|Resource Scheduler', module)
  .addDecorator(withKnobs)
  .add(
    'Resource Scheduler',
    () => <ResourceSchedulerWrapper/>
  )

class ResourceSchedulerWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.childKey = 0
  }
  render() {
    this.childKey++
    return (
      <div>
        <ResourceSchedulerApp
          key={this.childKey}
          locale={select('locale', ['de', 'en'])}
        />
      </div>
    )
  }
}
