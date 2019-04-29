import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import MultiCheckbox from './'

storiesOf('Tocco-UI | MultiCheckbox', module)
  .add(
    'MultiCheckbox',
    () =>
      <div>
        <MultiCheckbox
          onChange={action('box-action')}
        />
        <MultiCheckbox
          status="checked"
          onChange={action('box-action')}
        />
        <MultiCheckbox
          status="indeterminate"
          onChange={action('box-action')}
        />
      </div>
  )
