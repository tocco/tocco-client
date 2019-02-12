import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, boolean, text, select} from '@storybook/addon-knobs'
import {action} from '@storybook/addon-actions'

import EntityDetailApp from './main'

storiesOf('Apps/Entity Detail', module)
  .addDecorator(withKnobs)
  .add(
    'Entity Detail',
    () => <EntityDetailApp
      entityName={text('entityName', 'User')}
      entityId="detail-id"
      formName={text('formName', 'User')}
      mode={select('mode', ['update', 'create'] || 'create')}
      showSubGridsCreateButton={boolean('showSubGridsCreateButton', false)}

      onSubGridRowClick={action('SubGridRow clicked')}
      onSubGridNavigateToCreate={action('onSubGridNavigateToCreate')}
      onEntityCreated={action('entity created')}
      onTouchedChange={action('form touched')}
    />
  )
