import React from 'react'
import {v4 as uuid} from 'uuid'

import EntityBrowserApp from './main'

export default {
  title: 'Apps/Entity Browser',
  component: EntityBrowserApp,
  argTypes: {
    entityName: {defaultValue: 'User'},
    showSearchForm: {defaultValue: true},
    limit: {defaultValue: 20},
    scrollBehaviour: {
      defaultValue: 'none',
      options: ['none', 'inline'],
      control: {type: 'select'}
    }
  }
}

const EntityBrowserStory = ({...args}) => {
  return (
    <div style={{width: '1500px', height: '500px', padding: '5px'}}>
      <EntityBrowserApp key={uuid()} {...args} />
    </div>
  )
}

export const EntityBrowser = EntityBrowserStory.bind({})
EntityBrowser.args = {
  entityName: 'User',
  showSearchForm: true,
  limit: 20,
  scrollBehaviour: 'none'
}
