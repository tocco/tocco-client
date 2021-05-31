import React, {useState} from 'react'
import {action} from '@storybook/addon-actions'

import Range from './'

export default {
  title: 'Tocco-UI/Range',
  decorators: [Story => <div style={{maxWidth: '300px'}}> <Story/></div>],
  component: Range,
  args: {value: 'Test'}
}

export const DateRange = () => {
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
    fromText="from"
    toText="to"
  />
}

export const NumberRange = () => {
  const [value, setValue] = useState(50)
  return <Range
    fromText="from"
    toText="to"
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
