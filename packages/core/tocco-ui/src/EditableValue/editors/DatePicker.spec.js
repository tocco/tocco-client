import {startOfDay, startOfMonth} from 'date-fns'
import {mount} from 'enzyme'
import {IntlProvider} from 'react-intl'
import {intlEnzyme} from 'tocco-test-util'

import {loadLocales} from '../../DatePicker/utils'
import DatePicker from './DatePicker'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('editors', () => {
      describe('DatePicker ', () => {
        beforeEach(() => {
          loadLocales()
        })

        test('should be able to select a day', () => {
          const onChangeSpy = sinon.spy()
          const wrapper = intlEnzyme.mountWithIntl(<DatePicker onChange={onChangeSpy} hasTime={false} dateFormat="P" />)

          const input = wrapper.find('.react-datepicker__input-container input')
          input.simulate('focus')
          wrapper.find('.react-datepicker__day--001:not(.react-datepicker__day--outside-month)').simulate('click')

          const firstOfMonth = startOfMonth(new Date()).toISOString()
          expect(onChangeSpy).to.have.been.calledWith(firstOfMonth)
        })

        test('should be able to enter a date', () => {
          const onChangeSpy = sinon.spy()
          const wrapper = intlEnzyme.mountWithIntl(<DatePicker onChange={onChangeSpy} hasTime={false} dateFormat="P" />)

          const input = wrapper.find('.react-datepicker__input-container input')
          input.simulate('focus')

          input.simulate('change', {target: {value: '06/14/2022'}})

          const date = startOfDay(new Date('06/14/2022')).toISOString()
          expect(onChangeSpy).to.have.been.calledWith(date)
        })

        test('should be able to enter a date time', () => {
          const onChangeSpy = sinon.spy()
          const wrapper = intlEnzyme.mountWithIntl(<DatePicker onChange={onChangeSpy} hasTime dateFormat="Pp" />)

          const input = wrapper.find('.react-datepicker__input-container input')
          input.simulate('focus')

          input.simulate('change', {target: {value: '06/14/2022 14:00'}})

          const date = new Date('06/14/2022 14:00').toISOString()
          expect(onChangeSpy).to.have.been.calledWith(date)
        })

        test('should be able to enter a date time in localized format', () => {
          const onChangeSpy = sinon.spy()
          const wrapper = mount(
            <IntlProvider locale="de-CH" defaultLocale="de-CH">
              <DatePicker onChange={onChangeSpy} hasTime dateFormat="Pp" />
            </IntlProvider>
          )

          const input = wrapper.find('.react-datepicker__input-container input')
          input.simulate('focus')

          input.simulate('change', {target: {value: '14.06.2022 14:00'}})

          const date = new Date('06/14/2022 14:00').toISOString()
          expect(onChangeSpy).to.have.been.calledOnce
          expect(onChangeSpy).to.have.been.calledWith(date)
        })

        test('should be able to enter a time in popover', () => {
          const onChangeSpy = sinon.spy()
          const date = new Date('06/14/2022 14:00').toISOString()
          const wrapper = intlEnzyme.mountWithIntl(
            <DatePicker value={date} onChange={onChangeSpy} dateFormat="Pp" hasTime />
          )

          const input = wrapper.find('.react-datepicker__input-container input')
          input.simulate('focus')

          wrapper.find('input.react-datepicker-time__input').simulate('change', {target: {value: '10:00'}})

          const expectedDate = new Date('06/14/2022 10:00').toISOString()
          expect(onChangeSpy).to.have.been.calledWith(expectedDate)
        })
      })
    })
  })
})
