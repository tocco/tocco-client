import React from 'react'
import HtmlFormatter from './HtmlFormatter'
import {mount} from 'enzyme'

describe('tocco-ui', function() {
  describe('FormattedValue', function() {
    describe('HtmlFormatter ', function() {
      it('should format value', function() {
        const wrapper = mount(<HtmlFormatter value="<p>TEST TEST</p>"/>)
        expect(wrapper.html()).to.equal('<div><p>TEST TEST</p></div>')
        expect(wrapper.text()).to.equal('TEST TEST')
      })
    })
  })
})
