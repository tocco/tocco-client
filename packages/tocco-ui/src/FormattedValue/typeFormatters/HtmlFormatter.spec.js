import React from 'react'
import {mount} from 'enzyme'

import HtmlFormatter from './HtmlFormatter'

describe('tocco-ui', () => {
  describe('FormattedValue', () => {
    describe('typeFormatters', () => {
      describe('HtmlFormatter ', () => {
        test('should format value', () => {
          const wrapper = mount(<HtmlFormatter value="<p>TEST TEST</p>"/>)
          expect(wrapper.find('span')).to.have.length(1)
          expect(wrapper.text()).to.equal('TEST TEST')
        })
      })
    })
  })
})
