import React from 'react'
import {storiesOf} from '@storybook/react'
import {boolean, withKnobs} from '@storybook/addon-knobs'

import BurgerButton from './'

storiesOf('Tocco-UI | Burger Button', module)
  .addDecorator(withKnobs)
  .add(
    'Size Knob',
    () => <BurgerButton
      height={40}
      width={20}
      isOpen={boolean('open')}
    />
  )
