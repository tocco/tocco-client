import {intlEnzyme, TestThemeProvider} from 'tocco-test-util'

import FormattedValue from './FormattedValue'
import BooleanFormatter from './formatters/BooleanFormatter'
import DateFormatter from './formatters/DateFormatter'
import StringFormatter from './formatters/StringFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    test('should render a string value', () => {
      const wrapper = intlEnzyme.mountWithIntl(
        <TestThemeProvider>
          <FormattedValue type="string" value="test" />
        </TestThemeProvider>
      )
      expect(wrapper.find(StringFormatter)).to.have.length(1)
    })

    test('should render a date value', () => {
      const wrapper = intlEnzyme.mountWithIntl(
        <TestThemeProvider>
          <FormattedValue type="date" value="1976-03-16" />
        </TestThemeProvider>
      )
      expect(wrapper.find(DateFormatter)).to.have.length(1)
    })

    test('should return an empty span on a undefined input', () => {
      const wrapper = intlEnzyme.mountWithIntl(
        <TestThemeProvider>
          <FormattedValue type="string" value={undefined} />
        </TestThemeProvider>
      )
      expect(wrapper.html()).to.eql('<span></span>')
    })

    test('should return an empty span on empty input', () => {
      const wrapper = intlEnzyme.mountWithIntl(
        <TestThemeProvider>
          <FormattedValue type="date" value="" />
        </TestThemeProvider>
      )
      expect(wrapper.html()).to.eql('<span></span>')
    })

    test('should return an empty span on input "null"', () => {
      const wrapper = intlEnzyme.mountWithIntl(
        <TestThemeProvider>
          <FormattedValue type="string" value={null} />
        </TestThemeProvider>
      )
      expect(wrapper.html()).to.eql('<span></span>')
    })

    test('should not return an empty span on input false', () => {
      const wrapper = intlEnzyme.mountWithIntl(
        <TestThemeProvider>
          <FormattedValue type="boolean" value={false} />
        </TestThemeProvider>
      )
      expect(wrapper.find(BooleanFormatter)).to.have.length(1)
    })
  })
})
