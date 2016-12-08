import React from 'react'
import UrlFormatter from './UrlFormatter'
import {mount} from 'enzyme'

describe('tocco-ui', function() {
  describe('FormattedValue', function() {
    describe('UrlFormatter ', function() {
      it('should format value', function() {
        const wrapper = mount(<UrlFormatter
          value="http://www.tocco.ch"/>)
        expect(wrapper.find('a')).to.have.length(1)
        expect(wrapper.find('a')).to.have.attr('href', 'http://www.tocco.ch')
      })
    })
  })
})
