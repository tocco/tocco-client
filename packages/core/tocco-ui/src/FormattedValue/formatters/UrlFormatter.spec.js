import {mount} from 'enzyme'

import UrlFormatter from './UrlFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('formatters', () => {
      describe('UrlFormatter ', () => {
        test('should format value', () => {
          const wrapper = mount(<UrlFormatter value="http://www.tocco.ch" />)
          expect(wrapper.find('a')).to.have.length(1)
          expect(wrapper.find('a')).to.have.attr('href', 'http://www.tocco.ch')
        })
      })
    })
  })
})
