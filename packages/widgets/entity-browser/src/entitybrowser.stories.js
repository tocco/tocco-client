import {v4 as uuid} from 'uuid'

import EntityBrowserApp from './main'

export default {
  title: 'Apps/Entity Browser',
  component: EntityBrowserApp,
  argTypes: {
    entityName: {defaultValue: 'User'},
    searchFormType: {
      defaultValue: 'simple_advanced',
      options: ['none', 'fulltext', 'simple', 'simple_advanced', 'advanced'],
      control: {type: 'select'}
    },
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
  searchFormType: 'simple_advanced',
  limit: 20,
  scrollBehaviour: 'none'
}
