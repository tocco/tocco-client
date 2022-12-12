import Button from '../Button'
import GlobalStyles from '../GlobalStyles'
import DatePicker from './DatePicker'

export default {
  title: 'Tocco-UI/Datepicker',
  component: DatePicker
}

export const Basic = args => (
  <DatePicker {...args}>
    <Button icon="calendar" />
    {args.value.toLocaleString()}
  </DatePicker>
)

Basic.args = {
  value: new Date()
}

Basic.decorators = [
  Story => (
    <>
      <GlobalStyles />
      {Story()}
    </>
  )
]
