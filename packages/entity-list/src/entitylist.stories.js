/* eslint-disable react/prop-types */
import React from 'react'

import EntityListApp from './main'
import searchFormTypes from './util/searchFormTypes'

export default {
  title: 'Apps/Entity List',
  component: EntityListApp,
  argTypes: {
    searchFormType: {
      options: Object.values(searchFormTypes),
      control: {type: 'select'}
    },
    searchFormPosition: {
      options: ['top', 'left'],
      control: {type: 'select'}
    },
    scrollBehaviour: {
      options: ['none', 'inline'],
      control: {type: 'select'}
    }
  }
}

const EntityListStory = ({containerHeight, ...args}) => {
  return (
    <div style={{width: '1500px', height: containerHeight, padding: '5px'}}>
      <EntityListApp entityName="User" formName="User" {...args} />
    </div>
  )
}

export const Story = EntityListStory.bind({})
Story.args = {
  containerHeight: '300px',
  searchFormType: searchFormTypes.SIMPLE,
  searchFormPosition: 'top',
  limit: 20,
  scrollBehaviour: 'inline'
}
