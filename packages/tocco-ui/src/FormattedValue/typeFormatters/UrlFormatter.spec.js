import React from 'react'
import UrlFormatter from './UrlFormatter'
import {mount} from 'enzyme'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('UrlFormatter ', () => {
        it('should format value', () => {
          const wrapper = mount(<UrlFormatter
            value="http://www.tocco.ch"/>)
          expect(wrapper.find('a')).to.have.length(1)
          expect(wrapper.find('a')).to.have.attr('href', 'http://www.tocco.ch')
        })
      })
    })
  })
})
