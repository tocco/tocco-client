import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs} from '@storybook/addon-knobs'
import {injectIntl, intlShape} from 'react-intl'

import {ResourceSchedulerApp} from './main'
import Readme from '../README.md'

storiesOf('Apps|Resource Scheduler', module)
  .addDecorator(withKnobs)
  .add(
    'Resource Scheduler',
    () => <A/>,
    {info: {disable: true}, notes: Readme}

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
          locale={this.props.intl.locale}
        />
      </div>
    )
  }
}

ResourceSchedulerWrapper.propTypes = {
  intl: intlShape
}

const A = injectIntl(ResourceSchedulerWrapper)
