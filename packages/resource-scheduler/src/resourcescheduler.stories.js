import React from 'react'
import {v4 as uuid} from 'uuid'

import {ResourceSchedulerApp} from './main'

export default {
  title: 'Apps/Resource Scheduler',
  component: ResourceSchedulerApp
}

export const Basic = args => {
  return <ResourceSchedulerApp
    key={uuid()}
    {...args}
  />
}
