import React, {useState} from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs} from '@storybook/addon-knobs'

import Button from '../Button'
import DatePicker from './'
import {DatePicker as DatePickerProps} from './DatePicker'

storiesOf('Tocco-UI | Datepicker', module)
  .addDecorator(withKnobs)
  .addParameters({
    info: {propTables: [DatePickerProps], source: false}
  })
  .add(
    'Datepicker',
    () => {
      const [value, setValue] = useState('1988-11-14')
      return <DatePicker
        value={value}
        onChange={setValue}
      >
        <Button icon="calendar"/>
        {value}
      </DatePicker>
    }
  )
