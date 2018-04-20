
import React from 'react'
import Panel from './Panel'
import {shallow} from 'enzyme'

describe('tocco-ui', function() {
  describe('Panel', function() {
    it('body should be closed initially', () => {
      const wrapper = shallow(<Panel/>)
      expect(wrapper.state('isOpen')).to.equal(false)
    })

    it('body should be opened initially', () => {
      const wrapper = shallow(<Panel isOpen={true}/>)
      expect(wrapper.state('isOpen')).to.equal(true)
    })

    it('open state should be toggleable', () => {
      const wrapper = shallow(<Panel/>)
      expect(wrapper.state('isOpen')).to.equal(false)
      wrapper.instance().toggleOpenState()
      expect(wrapper.state('isOpen')).to.equal(true)
      wrapper.instance().toggleOpenState()
      expect(wrapper.state('isOpen')).to.equal(false)
    })

    it('should render parent and children', () => {
      const wrapper = shallow(<Panel><span>text-1</span><span>text-2</span></Panel>)
      expect(wrapper.find('div')).to.have.length(1)
      expect(wrapper.find('span')).to.have.length(2)
      expect(wrapper.find('span').first().text()).to.equal('text-1')
      expect(wrapper.find('span').last().text()).to.equal('text-2')
    })

    it('should pass props to child', () => {
      const wrapper = shallow(<Panel><span>text-1</span></Panel>)
      const {isOpen, isToggleable, toggleOpenState} = wrapper.find('span').props()
      expect(isOpen).to.equal(false)
      expect(isToggleable).to.equal(true)
      expect(typeof toggleOpenState).to.equal('function')
    })
  })
})
