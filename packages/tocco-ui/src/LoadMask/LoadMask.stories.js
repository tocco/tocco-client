import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, boolean, text} from '@storybook/addon-knobs'

import LoadMask from './'
import excludeIntlInfo from '../util/excludeIntlInfo'

storiesOf('Layout', module)
  .addDecorator(withKnobs)
  .add(
    'LoadMask',
    () =>
      <LoadMask required={[boolean('loaded', false)]} loadingText={text('loadingText', 'Loading...')}>
        LOADED
      </LoadMask>, excludeIntlInfo()
  )
