import React from 'react'
import {mount} from 'enzyme'

import HtmlFormatter from './HtmlFormatter'

describe('tocco-ui', function() {
  describe('FormattedValue', function() {
    describe('typeFormatters', () => {
      describe('HtmlFormatter ', function() {
        it('should format value', function() {
          const wrapper = mount(<HtmlFormatter value="<p>TEST TEST</p>"/>)
          expect(wrapper.find('div')).to.have.length(1)
          expect(wrapper.text()).to.equal('TEST TEST')
        })
      })
    })
  })
})
