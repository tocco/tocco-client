import React from 'react'
import {storiesOf} from '@storybook/react'
import {array, select, withKnobs} from '@storybook/addon-knobs'
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
    const calendarTypeKnob = select('Calendar type to preselect', {
      Lecturer: 'lecturer',
      Participant: 'participant',
      Room: 'room',
      Appliance: 'appliance',
      None: null
    }, null)
    const selectionKnob = array('Calendar keys to preselect', [])
    return <div>
      <ResourceSchedulerApp
        key={this.key++}
        locale={this.props.intl.locale}
        actionProperties={{calendarType: calendarTypeKnob}}
        selection={selectionKnob.length > 0 ? {type: 'ID', ids: selectionKnob.map(key => parseInt(key))} : null}
      />
    </div>
  }
}

ResourceSchedulerStory.propTypes = {
  intl: intlShape
}

const ResourceSchedulerStoryIntl = injectIntl(ResourceSchedulerStory)
