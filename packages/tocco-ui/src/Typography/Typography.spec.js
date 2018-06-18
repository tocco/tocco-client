import {mount, shallow} from 'enzyme'
import React from 'react'

import Span from './Typography'

describe('tocco-ui', function() {
  describe('Typography', function() {
    describe('Span', function() {
      it('should have one defaultProps', () => {
        const wrapper = shallow(
          <Span>Lorem Ipsum</Span>
        )
        const {breakWords, title} = wrapper.props()
        expect(breakWords).to.be.true
        expect(title).to.be.undefined
      })

      it('should not render title', () => {
        const wrapper = mount(
          <Span>Lorem ipsum</Span>
        )
        expect(wrapper.find('span').text()).to.equal('Lorem ipsum')
        expect(wrapper.find('span').prop('title')).to.be.undefined
      })

      it('should render title', () => {
        const wrapper = mount(
          <Span breakWords={false}>Lorem ipsum</Span>
        )
        expect(wrapper.find('span').text()).to.equal('Lorem ipsum')
        expect(wrapper.find('span').prop('title')).to.equal('Lorem ipsum')
      })
    })
  })
})
