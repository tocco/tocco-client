/* eslint-disable no-console */
import React from 'react'
import {storiesOf} from '@storybook/react'

import MultiCheckbox from './'

const cb = state => state === 'checked' ? console.log('now is checked') : console.log('now is unchecked')

storiesOf('MultiCheckbox', module)
  .add(
    'MultiCheckbox',
    () =>
      <div>
        {/* start example */}
        <MultiCheckbox
          onChange={cb}
        />
        <MultiCheckbox
          status="checked"
          onChange={cb}
        />
        <MultiCheckbox
          status="indeterminate"
          onChange={cb}
        />
        {/* end example */}
      </div>
  )
