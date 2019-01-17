import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {withKnobs, select, boolean, text} from '@storybook/addon-knobs'
import _pick from 'lodash/pick'

import Button from './'
import {stylingInk, stylingPosition, stylingLook} from '../utilStyles'
import excludeIntlInfo from '../util/excludeIntlInfo'

storiesOf('Navigation/Button', module)
  .addDecorator(withKnobs)
  .add(
    'Knobs',
    () =>
      (
        <Button
          label={text('label', 'My Button')}
          ink={select('ink', {'-': null, ...stylingInk}) || undefined}
          icon={select('icon', {'-': null, regular: 'air-freshener', brand: ['fab', 'google']}) || undefined}
          onClick={action('clicked')}
          look={select('look', {'-': null, ..._pick(stylingLook, ['FLAT', 'RAISED'])}) || undefined}
          iconPosition={select('iconPosition', {'-': null, ...stylingPosition}) || undefined}
          pending={boolean('pending', false)}
          dense={boolean('dense', false) || undefined}
          title={text('title')}
        />
      ), excludeIntlInfo()
  )
  .add(
    'Showcase',
    () => {
      return [
        <Button
          key="0"
          label="Primary"
          ink="primary"
        />,
        <Button
          key="1"
          label="Pending"
          pending
        />,
        <Button
          key="2"
          label="Icon"
          icon="trash-alt"
        />,
        <Button
          key="3"
          label="Brand Icon"
          icon={['fab', 'bitcoin']}
          iconPosition="append"
        />,
        <Button
          key="4"
          label="Dense"
          dense
        />
      ]
    }, excludeIntlInfo()
  )
