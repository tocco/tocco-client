
import React from 'react'
import {shallow} from 'enzyme'

import Panel, {StyledPanel} from './'

describe('tocco-ui', () => {
  describe('Panel', () => {
    describe('Panel', () => {
      test('body should be closed initially', () => {
        const wrapper = shallow(<Panel.Wrapper/>)
        expect(wrapper.state('isOpen')).to.equal(false)
      })

      test('body should be opened initially', () => {
        const wrapper = shallow(<Panel.Wrapper isOpen={true}/>)
        expect(wrapper.state('isOpen')).to.equal(true)
      })

      test('open state should be toggleable', () => {
        const wrapper = shallow(<Panel.Wrapper/>)
        expect(wrapper.state('isOpen')).to.equal(false)
        wrapper.instance().toggleOpenState()
        expect(wrapper.state('isOpen')).to.equal(true)
        wrapper.instance().toggleOpenState()
        expect(wrapper.state('isOpen')).to.equal(false)
      })

      test('should render parent and children', () => {
        const wrapper = shallow(<Panel.Wrapper><span>text-1</span><span>text-2</span></Panel.Wrapper>)
        expect(wrapper.find(StyledPanel)).to.have.length(1)
        expect(wrapper.find('span')).to.have.length(2)
        expect(wrapper.find('span').first().text()).to.equal('text-1')
        expect(wrapper.find('span').last().text()).to.equal('text-2')
      })

      test('should pass props to child', () => {
        const wrapper = shallow(<Panel.Wrapper><span>text-1</span></Panel.Wrapper>)
        const {isOpen, isToggleable, toggleOpenState} = wrapper.find('span').props()
        expect(isOpen).to.equal(false)
        expect(isToggleable).to.equal(true)
        expect(typeof toggleOpenState).to.equal('function')
      })

      test('should have three defaultProps', () => {
        const wrapper = shallow(
          <Panel.Wrapper>
            <span>child</span>
          </Panel.Wrapper>
        )
        const {isFramed, isOpen, isToggleable} = wrapper.find('span').props()
        expect(isFramed).to.be.true
        expect(isOpen).to.be.false
        expect(isToggleable).to.be.true
      })

      test('should pass three props to child', () => {
        const wrapper = shallow(
          <Panel.Wrapper
            isFramed={false}
            isOpen={true}
            isToggleable={false}
          >
            <span>child</span>
          </Panel.Wrapper>
        )
        const {isFramed, isOpen, isToggleable} = wrapper.find('span').props()
        expect(isFramed).to.be.false
        expect(isOpen).to.be.true
        expect(isToggleable).to.be.false
      })
    })
  })
})
