import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, array, boolean, number, text} from '@storybook/addon-knobs'

import EntityBrowserApp from './main'

storiesOf('Apps/Entity Browser', module)
  .addDecorator(withKnobs)
  .add(
    'Entity Browser',
    () => <EntityBrowserApp
      formName="Entity Browser"
      entityName={text('entityName', 'User')}
      showSearchForm={boolean('showSearchForm', true)}
      disableSimpleSearch={boolean('disableSimpleSearch', false)}
      formBase={text('formBase', 'User')}
      limit={number('limit', 10)}
      preselectedSearchFields={array('preselectedSearchFields', []) || undefined}
      searchFilters={array('searchFilters', []) || undefined}
      simpleSearchFields={text('simpleSearchFields', '') || undefined}
      nullBusinessUnit={boolean('nullBusinessUnit', false)}
      showCreateButton={boolean('showCreateButton', false)}
    />
  )
