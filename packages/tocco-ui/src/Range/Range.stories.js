import React, {useState} from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs} from '@storybook/addon-knobs'
import {action} from '@storybook/addon-actions'

import Range from './'

storiesOf('Tocco-UI | Range ', module)
  .addDecorator(withKnobs)
  .add(
    'Date Range',
    () => {
      const [value, setValue] = useState({isRangeValue: true, from: '2020-01-01', to: '2020-12-31'})
      return <Range
        type="date"
        value={value}
        events={{
          onChange: v => {
            setValue(v)
            action('changed')(v)
          }
        }}
      />
    }
  )
  .add(
    'Number Range',
    () => {
      const [value, setValue] = useState(50)
      return <Range
        type="number"
        value={value}
        options={{
          postPointDigits: 1,
          maxValue: 100,
          allowNegative: true,
          fixedDecimalScale: true,
          suffix: '%'
        }}
        events={{
          onChange: v => {
            setValue(v)
            action('changed')(v)
          }
        }}
      />
    }
  )
