import {mount} from 'enzyme'
import {IntlProvider} from 'react-intl'

import PercentFormatter from './PercentFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('formatters', () => {
      describe('PercentFormatter ', () => {
        test('should format value', () => {
          const wrapper = mount(
            <IntlProvider locale="en">
              <PercentFormatter value={0.0241} options={{postPointDigits: 2}} />
            </IntlProvider>
          )
          expect(wrapper.text()).to.equal('2.41%')
        })

        test('should respect postDecimalDigits', () => {
          const wrapper = mount(
            <IntlProvider locale="en">
              <PercentFormatter value={0.0241} options={{postPointDigits: 5}} />
            </IntlProvider>
          )
          expect(wrapper.text()).to.equal('2.41000%')
        })

        test('should format value according to locale', () => {
          const wrapper = mount(
            <IntlProvider locale="de">
              <PercentFormatter value={0.999} options={{postPointDigits: 2}} />
            </IntlProvider>
          )
          expect(wrapper.text()).to.equal('99,90\xa0%') // FormattedNumber uses a non-breaking space
        })
      })
    })
  })
})
