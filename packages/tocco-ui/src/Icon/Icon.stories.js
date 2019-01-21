import React from 'react'
import {storiesOf} from '@storybook/react'
import {text, withKnobs} from '@storybook/addon-knobs'

import {Icon} from './Icon'

storiesOf('Icon', module)
  .addDecorator(withKnobs)
  .add(
    'Icon Cards',
    () => (
      <div>
        <Icon icon="address-card" />
        <Icon icon="far, address-card"/>
        <Icon icon="fab, microsoft"/>
      </div>
    )
  )
  .add(
    'Icon Append',
    () => (
      <div>
        Appended Icon <Icon icon={text('icon', 'user')} position="append" />
      </div>
    )
  )
  .add(
    'Icon Prepend',
    () => (
      <div>
        <Icon icon={text('icon', 'user')} position="prepend"/> Prepended Icon
      </div>
    )
  )
  .add(
    'Icon Between',
    () => (
      <div>
        Icon between <Icon icon={text('icon', 'user')} position="between"/> Text
      </div>
    )
  )
  .add(
    'Icon Sole',
    () => (
      <div>
        Icon Dense <Icon icon={text('icon', 'user')} position="sole"/>
      </div>
    )
  )
