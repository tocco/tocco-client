import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, boolean, text} from '@storybook/addon-knobs'

import LoadMask from './'

storiesOf('LoadMask', module)
  .addDecorator(withKnobs)
  .add(
    'LoadMask',
    () =>
      <LoadMask required={[boolean('loaded', false)]} loadingText={text('loadingText', 'Loading...')}>
        LOADED
      </LoadMask>
  )
