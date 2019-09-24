import React from 'react'
import {storiesOf} from '@storybook/react'
import {text, withKnobs} from '@storybook/addon-knobs'

import LoadingSpinner from './'

storiesOf('Tocco-UI | Loading Spinner', module)
  .addDecorator(withKnobs)
  .add(
    'Size Knob',
    () => <LoadingSpinner
      size={text('size', '40px')}
    />
  )
  .add(
    'Color',
    () => <LoadingSpinner
      size="40px"
      style={{color: 'red'}}
    />
  )
