/* eslint-disable no-console */
import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import MultiCheckbox from './'

storiesOf('MultiCheckbox', module)
  .add(
    'MultiCheckbox',
    () =>
      <div>
        {/* start example */}
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
        {/* end example */}
      </div>
  )
