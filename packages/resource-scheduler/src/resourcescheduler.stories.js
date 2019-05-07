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
    () => <ResourceSchedulerStoryIntl/>,
    {info: {disable: true}, notes: Readme}

  )

class ResourceSchedulerStory extends React.Component {
  key = 0

  render() {
    return (
      <div>
        <ResourceSchedulerApp
          key={this.key++}
          locale={this.props.intl.locale}
        />
      </div>
    )
  }
}

ResourceSchedulerStory.propTypes = {
  intl: intlShape
}

const ResourceSchedulerStoryIntl = injectIntl(ResourceSchedulerStory)
