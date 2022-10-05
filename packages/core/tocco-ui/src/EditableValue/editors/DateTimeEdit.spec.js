import {enzymeUtil} from 'tocco-test-util'

import DatePicker from './DatePicker'
import DateTimeEdit from './DateTimeEdit'

const EMPTY_FUNC = () => {}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('editors', () => {
      describe('DateTimeEdit ', () => {
        test('should render an instance of DatePicker', () => {
          const wrapper = enzymeUtil.mountEmbedded(<DateTimeEdit onChange={EMPTY_FUNC} />)

          const datePicker = wrapper.find(DatePicker)
          expect(datePicker).to.have.length(1)
        })
      })
    })
  })
})
