import React from 'react'
import {storiesOf} from '@storybook/react'
import {boolean, withKnobs} from '@storybook/addon-knobs'

import BurgerButton from './'

storiesOf('Tocco-UI | Burger Button', module)
  .addDecorator(withKnobs)
  .add(
    'Size Knob',
    () => <BurgerButton
      size="20"
      color="fuchsia"
      isOpen={boolean('open')}
    />
  )
