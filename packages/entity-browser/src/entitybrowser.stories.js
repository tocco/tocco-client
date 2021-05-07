
import React from 'react'
import {v4 as uuid} from 'uuid'

import EntityBrowserApp from './main'

export default {
  title: 'Apps/Entity Browser',
  component: EntityBrowserApp,
  argTypes: {
    entityName: {defaultValue: 'User'},
    showSearchForm: {defaultValue: true},
    limit: {defaultValue: 20}
  }
}

export const EntityBrowserStory = ({...args}) => {
  return <EntityBrowserApp
    key={uuid()}
    {...args}
  />
}
