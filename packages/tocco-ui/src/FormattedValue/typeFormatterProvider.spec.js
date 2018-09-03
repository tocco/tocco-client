import {shallow, mount} from 'enzyme'

import typeFormatterProvider from './typeFormatterProvider'
import StringFormatter from './typeFormatters/StringFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatterProvider', () => {
      it('should render a string input and set props', () => {
        const wrapper = mount(
          typeFormatterProvider('string', 'test')
        )

        expect(wrapper.is(StringFormatter)).to.be.true
        expect(wrapper.props().value).to.equal('test')
      })

      it('should return empty div in case of unknown type', () => {
        const wrapper = shallow(
          typeFormatterProvider('unknown', 'test')
        )

        expect(wrapper.find('div')).to.have.length(1)
      })
    })
  })
})
