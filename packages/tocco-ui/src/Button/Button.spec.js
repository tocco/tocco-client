import React from 'react'
import Button from './Button'
import {shallow} from 'enzyme'

describe('tocco-ui', function() {
  describe('Button', function() {
    it('handles click events', () => {
      const onButtonClick = sinon.spy()
      const wrapper = shallow(
        <Button
          label=""
          onClick={onButtonClick}
        />
      )
      wrapper.find('button').simulate('click')
      expect(onButtonClick).to.have.property('callCount', 1)
    })

    it('should show label', () => {
      const wrapper = shallow(<Button
        label="test"
        onClick={() => undefined}
        />
      )
      expect(wrapper.find('button').text()).to.equal(' test')
    })

    it('should add name property', () => {
      const wrapper = shallow(<Button
        label=""
        onClick={() => undefined}
        name="test_name"
        />
      )
      expect(wrapper.find('button').prop('name')).to.equal('test_name')
    })

    it('should add classNames', () => {
      let wrapper = shallow(<Button
        label=""
        onClick={() => undefined}
        />
      )

      console.log('wrapper.html()', wrapper.html())
      expect(wrapper.find('button')).to.have.className('btn-primary')

      wrapper = shallow(<Button
        label=""
        className="class1 class2 class3"
        onClick={() => undefined}
        />
      )
      expect(wrapper.find('button')).to.have.className('class1')
      expect(wrapper.find('button')).to.have.className('class2')
      expect(wrapper.find('button')).to.have.className('class3')
    })

    it('can be disabled', () => {
      let wrapper = shallow(
        <Button
          label=""
          onClick={() => undefined}
        />
      )
      expect(wrapper.find('button')).to.not.have.property('disabled')

      wrapper = shallow(
        <Button
          label=""
          onClick={() => undefined}
          disabled={false}
        />
      )
      expect(wrapper.find('button')).to.not.have.property('disabled')

      wrapper = shallow(
        <Button
          label=""
          onClick={() => undefined}
          disabled
        />
      )
      expect(wrapper.find('button')).to.be.disabled()
    })

    it('shows pending spinner', () => {
      let wrapper = shallow(
        <Button
          label=""
          onClick={() => undefined}
        />
      )
      expect(wrapper.find('button').hasClass('pending')).to.equal(false)

      wrapper = shallow(
        <Button
          label=""
          onClick={() => undefined}
          pending={false}
        />
      )
      expect(wrapper.find('button').hasClass('pending')).to.equal(false)

      wrapper = shallow(
        <Button
          label=""
          onClick={() => undefined}
          pending
        />
      )
      expect(wrapper.find('button').hasClass('pending')).to.equal(true)
    })

    it('shows icon', () => {
      let wrapper = shallow(
        <Button
          label=""
          onClick={() => undefined}
          icon="icon"
        />
      )
      expect(wrapper.find('i').hasClass('icon')).to.equal(true)

      wrapper = shallow(
        <Button
          label=""
          onClick={() => undefined}
        />
      )
      expect(wrapper.find('i').prop('className')).to.equal('glyphicon')
    })

    it('sets default type to button', () => {
      let wrapper = shallow(
        <Button
          label=""
        />
      )
      expect(wrapper.find('button').prop('type')).to.equal('button')
    })

    it('set type ', () => {
      const wrapper = shallow(
        <Button
          label=""
          type="submit"
        />
      )
      expect(wrapper.find('button').prop('type')).to.equal('submit')
    })
  })
})
