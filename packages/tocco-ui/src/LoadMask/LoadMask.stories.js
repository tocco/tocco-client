import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, boolean} from '@storybook/addon-knobs'

import LoadMask from './'

storiesOf('LoadMask', module)
  .addDecorator(withKnobs)
  .add(
    'LoadMask',
    () =>
      <LoadMask
        required={[boolean('loaded')]}
        loadingText="Loading..."
      >
        LOADED
      </LoadMask>
  )
