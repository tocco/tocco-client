import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, array, boolean, number, select, text} from '@storybook/addon-knobs'
import {action} from '@storybook/addon-actions'

import EntityListApp from './main'

storiesOf('Apps/Entity List', module)
  .addDecorator(withKnobs)
  .add(
    'Entity List',
    () => <EntityListApp
      id="id"
      entityName="entity-list-story"
      formBase={text('formBase', 'User')}
      limit={number('list', 10)}
      showSearchForm={boolean('showSearchForm', true)}
      showCreateButton={boolean('showCreateButton', true)}
      searchFilters={array('searchFilters', [])}
      preselectedSearchFields={array('preselectedSearchFields', [])}
      disableSimpleSearch={boolean('disableSimpleSearch', false)}
      simpleSearchFields="txtFulltext"
      selectionStyle={select('selectionStyle', ['none', 'multi', 'single']) || 'none'}
      selection={array('selection', [])}
      selectOnRowClick={boolean('selectOnRowClick', false)}

      onRowClick={action('onRowClick')}
      navigateToCreate={action('new button clicked')}
      onSelectChange={action('selection change')}
    />
  )
