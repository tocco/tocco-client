import {mount, shallow} from 'enzyme'
import React from 'react'

import {
  Dd,
  Dt,
  Dl,
  Li,
  Ol,
  Ul
} from './List'

describe('tocco-ui', function() {
  describe('Typography', function() {
    describe('List', function() {
      describe('Dd', function() {
        it('should have one defaultProps', () => {
          const wrapper = shallow(
            <Dd>Lorem Ipsum</Dd>
          )
          const {breakWords, title} = wrapper.props()
          expect(breakWords).to.be.true
          expect(title).to.be.undefined
        })

        it('should not render title', () => {
          const wrapper = mount(
            <Dd>Lorem ipsum</Dd>
          )
          expect(wrapper.find('dd').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('dd').prop('title')).to.be.undefined
        })

        it('should render title', () => {
          const wrapper = mount(
            <Dd breakWords={false}>Lorem ipsum</Dd>
          )
          expect(wrapper.find('dd').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('dd').prop('title')).to.equal('Lorem ipsum')
        })
      })

      describe('Dl', function() {
        it('should display text', () => {
          const wrapper = mount(
            <Dl>Lorem ipsum</Dl>
          )
          expect(wrapper.find('dl').text()).to.equal('Lorem ipsum')
        })
      })

      describe('Dt', function() {
        it('should have one defaultProps', () => {
          const wrapper = shallow(
            <Dt>Lorem Ipsum</Dt>
          )
          const {breakWords, title} = wrapper.props()
          expect(breakWords).to.be.true
          expect(title).to.be.undefined
        })

        it('should not render title', () => {
          const wrapper = mount(
            <Dt>Lorem ipsum</Dt>
          )
          expect(wrapper.find('dt').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('dt').prop('title')).to.be.undefined
        })

        it('should render title', () => {
          const wrapper = mount(
            <Dt breakWords={false}>Lorem ipsum</Dt>
          )
          expect(wrapper.find('dt').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('dt').prop('title')).to.equal('Lorem ipsum')
        })
      })

      describe('Li', function() {
        it('should display text', () => {
          const wrapper = mount(
            <Li>Lorem ipsum</Li>
          )
          expect(wrapper.find('li').text()).to.equal('Lorem ipsum')
        })
      })

      describe('Ol', function() {
        it('should display text', () => {
          const wrapper = mount(
            <Ol>Lorem ipsum</Ol>
          )
          expect(wrapper.find('ol').text()).to.equal('Lorem ipsum')
        })
      })

      describe('Ul', function() {
        it('should display text', () => {
          const wrapper = mount(
            <Ul>Lorem ipsum</Ul>
          )
          expect(wrapper.find('ul').text()).to.equal('Lorem ipsum')
        })
      })
    })
  })
})
