import {mount, shallow} from 'enzyme'
import React from 'react'

import {H1, H2, H3, H4, H5, H6} from './Heading'

describe('tocco-ui', function() {
  describe('Typography', function() {
    describe('Heading', function() {
      describe('H1', function() {
        it('should have two defaultProps', () => {
          const wrapper = shallow(
            <H1>Lorem Ipsum</H1>
          )
          const {breakWords, styledLike, title} = wrapper.props()
          expect(breakWords).to.be.true
          expect(styledLike).to.be.equal('H1')
          expect(title).to.be.undefined
        })

        it('should not render title', () => {
          const wrapper = mount(
            <H1>Lorem ipsum</H1>
          )
          expect(wrapper.find('h1').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('h1').prop('title')).to.be.undefined
        })

        it('should render title', () => {
          const wrapper = mount(
            <H1 breakWords={false}>Lorem ipsum</H1>
          )
          expect(wrapper.find('h1').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('h1').prop('title')).to.equal('Lorem ipsum')
        })
      })

      describe('H2', function() {
        it('should have two defaultProps', () => {
          const wrapper = shallow(
            <H2>Lorem Ipsum</H2>
          )
          const {breakWords, styledLike, title} = wrapper.props()
          expect(breakWords).to.be.true
          expect(styledLike).to.be.equal('H2')
          expect(title).to.be.undefined
        })

        it('should not render title', () => {
          const wrapper = mount(
            <H2>Lorem ipsum</H2>
          )
          expect(wrapper.find('h2').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('h2').prop('title')).to.be.undefined
        })

        it('should render title', () => {
          const wrapper = mount(
            <H2 breakWords={false}>Lorem ipsum</H2>
          )
          expect(wrapper.find('h2').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('h2').prop('title')).to.equal('Lorem ipsum')
        })
      })

      describe('H3', function() {
        it('should have two defaultProps', () => {
          const wrapper = shallow(
            <H3>Lorem Ipsum</H3>
          )
          const {breakWords, styledLike, title} = wrapper.props()
          expect(breakWords).to.be.true
          expect(styledLike).to.be.equal('H3')
          expect(title).to.be.undefined
        })

        it('should not render title', () => {
          const wrapper = mount(
            <H3>Lorem ipsum</H3>
          )
          expect(wrapper.find('h3').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('h3').prop('title')).to.be.undefined
        })

        it('should render title', () => {
          const wrapper = mount(
            <H3 breakWords={false}>Lorem ipsum</H3>
          )
          expect(wrapper.find('h3').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('h3').prop('title')).to.equal('Lorem ipsum')
        })
      })

      describe('H4', function() {
        it('should have two defaultProps', () => {
          const wrapper = shallow(
            <H4>Lorem Ipsum</H4>
          )
          const {breakWords, styledLike, title} = wrapper.props()
          expect(breakWords).to.be.true
          expect(styledLike).to.be.equal('H4')
          expect(title).to.be.undefined
        })

        it('should not render title', () => {
          const wrapper = mount(
            <H4>Lorem ipsum</H4>
          )
          expect(wrapper.find('h4').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('h4').prop('title')).to.be.undefined
        })

        it('should render title', () => {
          const wrapper = mount(
            <H4 breakWords={false}>Lorem ipsum</H4>
          )
          expect(wrapper.find('h4').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('h4').prop('title')).to.equal('Lorem ipsum')
        })
      })

      describe('H5', function() {
        it('should have two defaultProps', () => {
          const wrapper = shallow(
            <H5>Lorem Ipsum</H5>
          )
          const {breakWords, styledLike, title} = wrapper.props()
          expect(breakWords).to.be.true
          expect(styledLike).to.be.equal('H5')
          expect(title).to.be.undefined
        })

        it('should not render title', () => {
          const wrapper = mount(
            <H5>Lorem ipsum</H5>
          )
          expect(wrapper.find('h5').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('h5').prop('title')).to.be.undefined
        })

        it('should render title', () => {
          const wrapper = mount(
            <H5 breakWords={false}>Lorem ipsum</H5>
          )
          expect(wrapper.find('h5').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('h5').prop('title')).to.equal('Lorem ipsum')
        })
      })

      describe('H6', function() {
        it('should have two defaultProps', () => {
          const wrapper = shallow(
            <H6>Lorem Ipsum</H6>
          )
          const {breakWords, styledLike, title} = wrapper.props()
          expect(breakWords).to.be.true
          expect(styledLike).to.be.equal('H6')
          expect(title).to.be.undefined
        })

        it('should not render title', () => {
          const wrapper = mount(
            <H6>Lorem ipsum</H6>
          )
          expect(wrapper.find('h6').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('h6').prop('title')).to.be.undefined
        })

        it('should render title', () => {
          const wrapper = mount(
            <H6 breakWords={false}>Lorem ipsum</H6>
          )
          expect(wrapper.find('h6').text()).to.equal('Lorem ipsum')
          expect(wrapper.find('h6').prop('title')).to.equal('Lorem ipsum')
        })
      })
    })
  })
})
