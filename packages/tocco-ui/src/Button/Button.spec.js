import {mount, shallow} from 'enzyme'
import React from 'react'

import Button from './Button'

describe('tocco-ui', function() {
  describe('Button', function() {
    it('should handle click events', () => {
      const onButtonClick = sinon.spy()
      const wrapper = mount(<Button onClick={onButtonClick}/>)
      wrapper.find('button').simulate('click')
      expect(onButtonClick).to.have.property('callCount', 1)
    })

    it('should show label', () => {
      const wrapper = mount(<Button label="test"/>)
      expect(wrapper.find('button').text()).to.equal('test')
    })

    it('should show children if no label is provided', () => {
      const child = 'test123'
      const wrapper = mount(<Button>{child}</Button>)
      expect(wrapper.find('button').text()).to.equal(child)
    })

    it('should be disabled and hidden', () => {
      let wrapper = mount(<Button/>)
      expect(wrapper.find('button')).to.not.have.property('disabled')

      wrapper = mount(<Button disabled={false}/>)
      expect(wrapper.find('button')).to.not.have.property('disabled')

      wrapper = mount(<Button disabled/>)
      expect(wrapper.find('button')).to.be.disabled()
    })

    it('should show pending spinner', () => {
      let wrapper = mount(<Button/>)
      expect(wrapper.find('IconTocco')).to.have.length(0)

      wrapper = mount(<Button pending={false}/>)
      expect(wrapper.find('IconTocco')).to.have.length(0)

      wrapper = mount(<Button pending/>)
      expect(wrapper.find('IconTocco')).to.have.length(1)
    })

    it('should show icon', () => {
      const wrapper = mount(<Button icon="icon"/>)
      expect(wrapper.find('Icon')).to.have.length(1)
    })

    it('should set default type to button', () => {
      const wrapper = mount(<Button/>)
      expect(wrapper.find('button').prop('type')).to.equal('button')
    })

    it('should set type', () => {
      const wrapper = mount(<Button type="submit"/>)
      expect(wrapper.find('button').prop('type')).to.equal('submit')
    })

    it('should have four defaultProps', () => {
      /* wrapper.props() and wrapper.instance().props does not list label and iconPosition */
      const wrapper = shallow(<Button/>)
      const {iconPosition, ink, look, type} = wrapper.props()
      expect(iconPosition).to.equal('prepend')
      expect(ink).to.equal('base')
      expect(look).to.equal('flat')
      expect(type).to.equal('button')
    })
  })
})
