
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

    it('should add classNames', () => {
      const wrapper = shallow(
        <Button className="class1 class2 class3"/>
      ).dive()

      expect(wrapper.find('button')).to.have.className('class1')
      expect(wrapper.find('button')).to.have.className('class2')
      expect(wrapper.find('button')).to.have.className('class3')
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
      )
      expect(wrapper.find('i').hasClass('fa-spin')).to.equal(false)

      wrapper = shallow(
        <Button
          pending={false}
        />
      )
      expect(wrapper.find('i').hasClass('fa-spin')).to.equal(false)

      wrapper = shallow(
        <Button pending/>
      )
      expect(wrapper.find('i').hasClass('fa-spin')).to.equal(true)
    })

    it('should show icon', () => {
      const wrapper = shallow(
        <Button icon="icon"/>
      )
      expect(wrapper.find('i').hasClass('icon')).to.equal(true)
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

    it('should have four defaultProps', () => {
      const wrapper = shallow(
        <Button/>
      )
      const props = wrapper.instance().props
      expect(Object.keys(props).length).to.equal(4)
      const {ink, label, look, type} = props
      expect(ink).to.equal('base')
      expect(label).to.equal('')
      expect(look).to.equal('flat')
      expect(type).to.equal('button')
    })
  })
})
