import {enzymeUtil} from 'tocco-test-util'

import DateEdit from './DateEdit'
import DatePicker from './DatePicker'

const EMPTY_FUNC = () => {}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('editors', () => {
      describe('DateEdit ', () => {
        test('should render an instance of DatePicker', () => {
          const wrapper = enzymeUtil.mountEmbedded(<DateEdit onChange={EMPTY_FUNC} />)

          const datePicker = wrapper.find(DatePicker)
          expect(datePicker).to.have.length(1)
        })
      })
    })
  })
})
