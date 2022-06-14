import {useState} from 'react'

import Button from '../Button'
import DatePicker from './DatePicker'

export default {
  title: 'Tocco-UI/Datepicker',
  component: DatePicker
}

export const Basic = ({...props}) => {
  const [value, setValue] = useState(new Date())
  return (
    <DatePicker {...props} value={value} onChange={setValue}>
      <Button icon="calendar" />
      {value.toLocaleString()}
    </DatePicker>
  )
}
