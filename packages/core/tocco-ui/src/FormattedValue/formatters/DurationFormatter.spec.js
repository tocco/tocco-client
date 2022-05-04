import {mount} from 'enzyme'
import {IntlProvider} from 'react-intl'

import DurationFormatter from './DurationFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('formatters', () => {
      describe('DurationFormatter ', () => {
        const leftToRightMark = /\u200E/g // required for browser Edge

        test('should format value with seconds', () => {
          const ms = 83000

          const duration = '00:01:23.000'

          const wrapper = mount(
            <IntlProvider locale="de-CH">
              <DurationFormatter value={ms} />
            </IntlProvider>
          )

          expect(wrapper.text().replace(leftToRightMark, '')).to.equal(duration)
        })
        test('should format value with seconds & milliseconds', () => {
          const ms = 63123

          const duration = '00:01:03.123'

          const wrapper = mount(
            <IntlProvider locale="de-CH">
              <DurationFormatter value={ms} />
            </IntlProvider>
          )

          expect(wrapper.text().replace(leftToRightMark, '')).to.equal(duration)
        })

        test('should format value w/o seconds', () => {
          const ms = 120000

          const duration = '00:02'

          const wrapper = mount(
            <IntlProvider locale="de-CH">
              <DurationFormatter value={ms} />
            </IntlProvider>
          )

          expect(wrapper.text().replace(leftToRightMark, '')).to.equal(duration)
        })

        test('should format value in en', () => {
          const ms = 120000

          const duration = '00:02'

          const wrapper = mount(
            <IntlProvider locale="en">
              <DurationFormatter value={ms} />
            </IntlProvider>
          )

          expect(wrapper.text().replace(leftToRightMark, '')).to.equal(duration)
        })

        test('should format value in fr-CH', () => {
          const ms = 83123

          const duration = '00:01:23.123'

          const wrapper = mount(
            <IntlProvider locale="fr-CH">
              <DurationFormatter value={ms} />
            </IntlProvider>
          )

          expect(wrapper.text().replace(leftToRightMark, '')).to.equal(duration)
        })

        test('should format value in it-CH', () => {
          const ms = 83123

          const duration = '00:01:23.123'

          const wrapper = mount(
            <IntlProvider locale="it-CH">
              <DurationFormatter value={ms} />
            </IntlProvider>
          )

          expect(wrapper.text().replace(leftToRightMark, '')).to.equal(duration)
        })
      })
    })
  })
})
