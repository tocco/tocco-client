import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {withKnobs, select, boolean, text} from '@storybook/addon-knobs'
import _pick from 'lodash/pick'

import Button from './'
import {stylingInk, stylingPosition, stylingLook} from '../utilStyles'

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add(
    'Knobs',
    () => (
      <Button
        dense={boolean('dense', false) || undefined}
        disabled={boolean('disabled', false) || undefined}
        ink={select('ink', {'-': null, ...stylingInk}) || undefined}
        icon={select('icon', {
          '-': null,
          regular: 'air-freshener',
          brand: ['fab', 'google'],
          times: 'times'}) || undefined
        }
        iconPosition={select('iconPosition', {
          [Button.defaultProps.iconPosition.toUpperCase()]: Button.defaultProps.iconPosition,
          ..._pick(stylingPosition, ['APPEND', 'PREPEND', 'SOLE'])}) || undefined
        }
        label={text('label', 'My Button')}
        look={select('look', {
          [Button.defaultProps.look.toUpperCase()]: Button.defaultProps.look,
          ..._pick(stylingLook, ['BALL', 'FLAT', 'RAISED'])
        }) || undefined}
        onClick={action('clicked')}
        pending={boolean('pending', false) || undefined}
        title={text('title')}
        type={select('type', ['button', 'submit', 'reset'] || undefined)}
      />
    )
  ).add(
    'Showcase',
    () => {
      const knobs = {
        dense: boolean('dense', false) || undefined,
        disabled: boolean('disabled', false) || undefined
      }
      return [
        <Button
          {...knobs}
          key="1"
          label="Base color flat"
          onClick={action('clicked')}
        />,
        <Button
          {...knobs}
          ink="primary"
          key="2"
          label="Primary color flat"
        />,
        <Button
          {...knobs}
          key="3"
          label="Base color raised"
          look="raised"
        />,
        <Button
          {...knobs}
          ink="primary"
          key="4"
          label="Primary color raised"
          look="raised"
        />,
        <Button
          {...knobs}
          icon="handshake"
          iconPosition="append"
          key="5"
          label="Icon with text"
          type="submit"
        />,
        <Button
          {...knobs}
          icon="fab, facebook"
          key="6"
          label="Brand Icon"
        />,
        <Button
          {...knobs}
          icon="air-freshener"
          ink="primary"
          key="9"
          label="Pending"
          pending={true}
        />,
        <Button
          {...knobs}
          label="I"
          key="10"
          look="ball"
        />,
        <Button
          {...knobs}
          key="10"
          look="raised"
        ><i>child</i></Button>
      ]
    }
  )
