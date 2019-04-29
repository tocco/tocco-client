import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, number} from '@storybook/addon-knobs'

import SomeOf from './'

storiesOf('Tocco-UI | SomeOf', module)
  .addDecorator(withKnobs)
  .add(
    'SomeOf',
    () => <SomeOf some={number('Some', 9)} of={number('Of', 8048)} />
  )
