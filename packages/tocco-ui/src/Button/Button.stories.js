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
    () =>
      (
        <Button
          label={text('label', 'My Button')}
          ink={select('ink', {'-': null, ...stylingInk}) || undefined}
          icon={select('icon', {
            '-': null,
            regular: 'air-freshener',
            brand: ['fab', 'google'],
            times: 'times'}) || undefined
          }
          onClick={action('clicked')}
          look={select('look', {
            [Button.defaultProps.look.toUpperCase()]: Button.defaultProps.look,
            ..._pick(stylingLook, ['BALL', 'FLAT', 'RAISED'])
          }) || undefined}
          iconPosition={select('iconPosition', {
            [Button.defaultProps.iconPosition.toUpperCase()]: Button.defaultProps.iconPosition,
            ..._pick(stylingPosition, ['APPEND', 'PREPEND', 'SOLE'])}) || undefined
          }
          pending={boolean('pending', false) || undefined}
          dense={boolean('dense', false) || undefined}
          title={text('title')}
          disabled={boolean('disabled', false)}
          type={select('type', ['button', 'submit', 'reset'] || undefined)}
        />
      )
  )
  .add(
    'Showcase',
    () => {
      return [
        <Button
          dense={boolean('dense', false) || undefined}
          disabled={boolean('disabled', false) || undefined}
          key="1"
          label="Base color flat"
          onClick={action('clicked')}
        />,
        <Button
          dense={boolean('dense', false) || undefined}
          disabled={boolean('disabled', false) || undefined}
          key="2"
          ink="primary"
          label="Primary color flat"
        />,
        <Button
          dense={boolean('dense', false) || undefined}
          disabled={boolean('disabled', false) || undefined}
          key="3"
          label="Base color raised"
          look="raised"
        />,
        <Button
          dense={boolean('dense', false) || undefined}
          disabled={boolean('disabled', false) || undefined}
          key="4"
          ink="primary"
          label="Primary color raised"
          look="raised"
        />,
        <Button
          dense={boolean('dense', false) || undefined}
          disabled={boolean('disabled', false) || undefined}
          key="5"
          icon="handshake"
          iconPosition="append"
          label="Icon with text"
          type="submit"
        />,
        <Button
          dense={boolean('dense', false) || undefined}
          disabled={boolean('disabled', false) || undefined}
          key="6"
          icon="fab, facebook"
          label="Brand Icon"
        />,
        <Button
          dense={boolean('dense', false) || undefined}
          disabled={boolean('disabled', false) || undefined}
          key="9"
          ink="primary"
          icon="air-freshener"
          pending={true}
          label="Pending"
        />,
        <Button
          dense={boolean('dense', false) || undefined}
          disabled={boolean('disabled', false) || undefined}
          key="10"
          icon="times"
          look="ball" />
      ]
    }
  )
