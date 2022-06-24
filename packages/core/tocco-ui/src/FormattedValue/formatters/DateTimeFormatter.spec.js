import {mount} from 'enzyme'
import {IntlProvider} from 'react-intl'

import DateTimeFormatter from './DateTimeFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('formatters', () => {
      describe('DateTimeFormatter ', () => {
        test('should handle null value', () => {
          const wrapper = mount(
            <IntlProvider locale="en">
              <DateTimeFormatter value={null} />
            </IntlProvider>
          )

          expect(wrapper.text()).to.equal('')
          expect(wrapper.find('time')).to.have.length(0)
        })

        test('should handle invalid value', () => {
          const wrapper = mount(
            <IntlProvider locale="en">
              <DateTimeFormatter value="some invalid text" />
            </IntlProvider>
          )

          expect(wrapper.text()).to.equal('')
          expect(wrapper.find('time')).to.have.length(0)
        })

        test('should format value', () => {
          const wrapper = mount(
            <IntlProvider locale="en">
              <DateTimeFormatter value="1976-03-16T12:00:00.000Z" />
            </IntlProvider>
          )

          expect(wrapper.text()).to.not.equal('')
          expect(wrapper.find('time').prop('title')).to.not.equal('')
          expect(wrapper.find('time').prop('dateTime')).to.not.equal('')
        })

        test('should format value according to locale', () => {
          const wrapper = mount(
            <IntlProvider locale="de">
              <DateTimeFormatter value="1976-03-16T12:00:00.000Z" />
            </IntlProvider>
          )

          expect(wrapper.text()).to.not.equal('')
          expect(wrapper.find('time').prop('title')).to.not.equal('')
          expect(wrapper.find('time').prop('dateTime')).to.not.equal('')
        })

        test('should recognize alternative datetime formats', () => {
          const wrapper = mount(
            <IntlProvider locale="de">
              <DateTimeFormatter value={1594562400000} />
            </IntlProvider>
          )

          expect(wrapper.text()).to.not.equal('')
          expect(wrapper.find('time').prop('title')).to.not.equal('')
          expect(wrapper.find('time').prop('dateTime')).to.not.equal('')
        })
      })
    })
  })
})
