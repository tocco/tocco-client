import {mount} from 'enzyme'
import {IntlProvider} from 'react-intl'

import TimeFormatter from './TimeFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('formatters', () => {
      describe('TimeFormatter ', () => {
        const leftToRightMark = /\u200E/g // required for browser Edge

        const timeOutputIso = '23:15:00.000'
        const timeOutputEn = '23:15'
        const timeOutputDe = '23:15'

        const timeValue = '23:15'

        test('should format value', () => {
          const wrapper = mount(
            <IntlProvider locale="en">
              <TimeFormatter value={timeValue} />
            </IntlProvider>
          )
          expect(wrapper.text().replace(leftToRightMark, '')).to.equal(timeOutputEn)
          expect(wrapper.find('time').prop('title').replace(leftToRightMark, '')).to.equal(timeOutputEn)
          expect(wrapper.find('time').prop('dateTime').replace(leftToRightMark, '')).to.equal(timeOutputIso)
        })

        test('should format value according to locale', () => {
          const wrapper = mount(
            <IntlProvider locale="de">
              <TimeFormatter value={timeValue} />
            </IntlProvider>
          )
          expect(wrapper.text().replace(leftToRightMark, '')).to.equal(timeOutputDe)
          expect(wrapper.find('time').prop('title').replace(leftToRightMark, '')).to.equal(timeOutputDe)
          expect(wrapper.find('time').prop('dateTime').replace(leftToRightMark, '')).to.equal(timeOutputIso)
        })
      })
    })
  })
})
