import {mount} from 'enzyme'

import FormatterProvider from './FormatterProvider'
import StringFormatter from './formatters/StringFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('FormatterProvider', () => {
      test('should render a string input and set props', () => {
        const wrapper = mount(<FormatterProvider componentType="string" value="test" />)

        expect(wrapper.find(StringFormatter)).to.have.length(1)
        expect(wrapper.find(StringFormatter).first().props().value).to.equal('test')
      })

      test('should return empty div in case of unknown type', () => {
        const wrapper = mount(<FormatterProvider componentType="unknown" value="test" />)

        expect(wrapper.find('div')).to.have.length(1)
      })
    })
  })
})
