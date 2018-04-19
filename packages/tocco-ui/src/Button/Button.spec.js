
import React from 'react'
import Button from './Button'
import {shallow} from 'enzyme'

describe('tocco-ui', function() {
  describe('Button', function() {
    it('should handle click events', () => {
      const onButtonClick = sinon.spy()
      const wrapper = shallow(
        <Button onClick={onButtonClick}/>
      ).dive()
      wrapper.find('button').simulate('click')
      expect(onButtonClick).to.have.property('callCount', 1)
    })

    it('should show label', () => {
      const wrapper = shallow(
        <Button label="test"/>
      ).dive()
      expect(wrapper.find('button').text()).to.equal('test')
    })

    it('should add name property', () => {
      const wrapper = shallow(
        <Button name="test_name"/>
      ).dive()
      expect(wrapper.find('button').prop('name')).to.equal('test_name')
    })

    it('should be disabled and hidden', () => {
      let wrapper = shallow(
        <Button/>
      ).dive()
      expect(wrapper.find('button')).to.not.have.property('disabled')

      wrapper = shallow(
        <Button disabled={false}/>
      ).dive()
      expect(wrapper.find('button')).to.not.have.property('disabled')

      wrapper = shallow(
        <Button disabled/>
      ).dive()
      expect(wrapper.find('button')).to.be.disabled()
    })

    it('should show pending spinner', () => {
      let wrapper = shallow(
        <Button/>
      ).dive()
      expect(wrapper.find('Icon')).to.have.length(0)

      wrapper = shallow(
        <Button
          pending={false}
        />
      ).dive()
      expect(wrapper.find('Icon')).to.have.length(0)

      wrapper = shallow(
        <Button pending/>
      ).dive()
      expect(wrapper.find('Icon').prop('animation')).to.equal('spin')
      expect(wrapper.find('Icon').prop('icon')).to.equal('fa-circle-o-notch')
    })

    it('should show icon', () => {
      const wrapper = shallow(
        <Button icon="icon"/>
      ).dive()
      expect(wrapper.find('Icon')).to.have.length(1)
    })

    it('should set default type to button', () => {
      const wrapper = shallow(
        <Button/>
      ).dive()
      expect(wrapper.find('button').prop('type')).to.equal('button')
    })

    it('should set type', () => {
      const wrapper = shallow(
        <Button type="submit"/>
      ).dive()
      expect(wrapper.find('button').prop('type')).to.equal('submit')
    })

    it('should have five defaultProps (only three testable)', () => {
      /* wrapper.props() and wrapper.instance().props does not list label and iconPosition */
      const wrapper = shallow(
        <Button/>
      )
      const {ink, look, type} = wrapper.props()
      expect(ink).to.equal('base')
      expect(look).to.equal('flat')
      expect(type).to.equal('button')
    })
  })
})
