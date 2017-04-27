import React from 'react'
import Button from './Button'
import {shallow} from 'enzyme'

describe('tocco-ui', function() {
  describe('Button', function() {
    it('should handle click events', () => {
      const onButtonClick = sinon.spy()
      const wrapper = shallow(
        <Button onClick={onButtonClick}/>
      )
      wrapper.find('button').simulate('click')
      expect(onButtonClick).to.have.property('callCount', 1)
    })

    it('should show label', () => {
      const wrapper = shallow(
        <Button label="test"/>
      )
      expect(wrapper.find('button').text()).to.equal(' test')
    })

    it('should add name property', () => {
      const wrapper = shallow(
        <Button name="test_name"/>
      )
      expect(wrapper.find('button').prop('name')).to.equal('test_name')
    })

    it('should add classNames', () => {
      let wrapper = shallow(
        <Button/>
      )

      expect(wrapper.find('button')).to.have.className('btn')

      wrapper = shallow(
        <Button className="class1 class2 class3"/>
      )

      expect(wrapper.find('button')).to.have.className('class1')
      expect(wrapper.find('button')).to.have.className('class2')
      expect(wrapper.find('button')).to.have.className('class3')
    })

    it('should add primary class if primary prop is set', () => {
      let wrapper = shallow(
        <Button primary/>
      )

      expect(wrapper.find('button')).to.have.className('btn-primary')
    })

    it('should be disabled and hidden', () => {
      let wrapper = shallow(
        <Button/>
      )
      expect(wrapper.find('button')).to.not.have.property('disabled')

      wrapper = shallow(
        <Button disabled={false}/>
      )
      expect(wrapper.find('button')).to.not.have.property('disabled')

      wrapper = shallow(
        <Button disabled/>
      )
      expect(wrapper.find('button')).to.be.disabled()
    })

    it('should show pending spinner', () => {
      let wrapper = shallow(
        <Button/>
      )
      expect(wrapper.find('button').hasClass('pending')).to.equal(false)

      wrapper = shallow(
        <Button
          pending={false}
        />
      )
      expect(wrapper.find('button').hasClass('pending')).to.equal(false)

      wrapper = shallow(
        <Button pending/>
      )
      expect(wrapper.find('button').hasClass('pending')).to.equal(true)
    })

    it('should show icon', () => {
      let wrapper = shallow(
        <Button icon="icon"/>
      )
      expect(wrapper.find('i').hasClass('icon')).to.equal(true)

      wrapper = shallow(
        <Button/>
      )
      expect(wrapper.find('i')).to.have.length(0)
    })

    it('should set default type to button', () => {
      let wrapper = shallow(
        <Button/>
      )
      expect(wrapper.find('button').prop('type')).to.equal('button')
    })

    it('should set type', () => {
      const wrapper = shallow(
        <Button type="submit"/>
      )
      expect(wrapper.find('button').prop('type')).to.equal('submit')
    })
  })
})
