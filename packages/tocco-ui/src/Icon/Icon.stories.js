import React from 'react'
import {storiesOf} from '@storybook/react'
import {select, withKnobs} from '@storybook/addon-knobs'

import {Icon} from './Icon'

storiesOf('Tocco-UI | Icon', module)
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
        Appended Icon <Icon icon={select('Icon', ['user', 'envelope']) || 'user'} position="append" />
      </div>
    )
  )
  .add(
    'Icon Prepend',
    () => (
      <div>
        <Icon icon={select('Icon', ['user', 'envelope']) || 'user'} position="prepend"/> Prepended Icon
      </div>
    )
  )
  .add(
    'Icon Between',
    () => (
      <div>
        Icon between <Icon icon={select('Icon', ['user', 'envelope']) || 'user'} position="between"/> Text
      </div>
    )
  )
  .add(
    'Icon Sole',
    () => (
      <div>
        Icon Dense <Icon icon={select('Icon', ['user', 'envelope']) || 'user'} position="sole"/>
      </div>
    )
  )
