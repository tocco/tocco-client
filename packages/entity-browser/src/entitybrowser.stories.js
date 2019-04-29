import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, array, boolean, number, text} from '@storybook/addon-knobs'

import EntityBrowserApp from './main'

storiesOf('Apps|Entity Browser', module)
  .addDecorator(withKnobs)
  .add(
    'Entity Browser',
    () => <EntityStoryWrapper/>
  )

class EntityStoryWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.childKey = 0
  }
  render() {
    this.childKey++
    return <EntityBrowserApp
      key={this.childKey}
      entityId="1"
      entityName={text('entityName', 'User')}
      showSearchForm={boolean('showSearchForm', true)}
      disableSimpleSearch={boolean('disableSimpleSearch', false)}
      formBase={text('formBase', 'User')}
      limit={number('limit', 10)}
      preselectedSearchFields={array('preselectedSearchFields', [])}
      searchFilters={array('searchFilters', [])}
      initialKey={text('initialKey', '')}
      simpleSearchFields={text('simpleSearchFields', '')}
      nullBusinessUnit={boolean('nullBusinessUnit', false)}
      showCreateButton={boolean('showCreateButton', true)}
      memoryHistory={boolean('memoryHistory', false)}
    />
  }
}
