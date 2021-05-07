import React, {useState} from 'react'

import Button from '../Button'
import DatePicker from './'

export default {
  title: 'Tocco-UI/Datepicker',
  component: DatePicker
}

export const Basic = () => {
  const [value, setValue] = useState('1988-11-14')
  return <DatePicker
    value={value}
    onChange={setValue}
  >
    <Button icon="calendar" />
    {value}
  </DatePicker>
}
