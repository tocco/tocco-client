import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, boolean, select, text} from '@storybook/addon-knobs'

import StatedValue from './StatedValue'

const errors = {
  no: {},
  mixed: {
    error1: ['error1-1', 'error1-2'],
    error2: ['error2']
  }
}

const content = <input id="input" style={{width: '100%', border: 0, outline: 0}} />

storiesOf('StatedValue', module)
  .addDecorator(withKnobs)
  .add(
    'StatedValue',
    () => {
      const knobs = {
        description: text('description', 'A helper text to instruct users.'),
        dirty: boolean('dirty', false) || undefined,
        error: select('error', {
          'mixed errors': errors.mixed,
          'no errors': errors.no
        }, errors.mixed),
        hasValue: boolean('hasValue', false) || undefined,
        label: text('label', 'label'),
        mandatory: boolean('mandatory', false) || undefined,
        touched: boolean('touched', false) || undefined
      }
      return [
        <StatedValue
          {...knobs}
          content={content}
          id="input"
          key="input-1"
        />,
        <StatedValue
          {...knobs}
          content={content}
          id="input"
          key="input-2"
        />
      ]
    }
  )
