import React from 'react'
import {storiesOf} from '@storybook/react'
import {text, withKnobs} from '@storybook/addon-knobs'
import {withSmartKnobs} from 'storybook-addon-smart-knobs'

import Icon from './Icon'
import excludeIntlInfo from '../util/excludeIntlInfo'

storiesOf('Display Data/Icon', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(withKnobs)
  .add(
    'Icon Cards',
    () => (
      <div>
        <Icon icon="address-card" />
        <Icon icon="far, address-card"/>
        <Icon icon="fab, microsoft"/>
      </div>
    ), excludeIntlInfo()
  )
  .add(
    'Icon Append',
    () => (
      <div>
        Appended Icon <Icon icon={text('icon', 'user')} position="append" />
      </div>
    ), excludeIntlInfo()
  )
  .add(
    'Icon Prepend',
    () => (
      <div>
        <Icon icon={text('icon', 'user')} position="prepend"/> Prepended Icon
      </div>
    ), excludeIntlInfo()
  )
  .add(
    'Icon Between',
    () => (
      <div>
        Icon between <Icon icon={text('icon', 'user')} position="between"/> Text
      </div>
    ), excludeIntlInfo()
  )
  .add(
    'Icon Sole',
    () => (
      <div>
        Icon Dense <Icon icon={text('icon', 'user')} position="sole"/>
      </div>
    ), excludeIntlInfo()
  )
