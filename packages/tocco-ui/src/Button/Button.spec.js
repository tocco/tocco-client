import {enzymeUtil} from 'tocco-test-util'
import React from 'react'

import Icon from '../Icon'
import IconTocco from '../LoadingSpinner'
import Button from './Button'

describe('tocco-ui', () => {
  describe('Button', () => {
    test('should handle click events', () => {
      const onButtonClick = sinon.spy()
      const wrapper = enzymeUtil.mountEmbedded(<Button onClick={onButtonClick}/>)
      wrapper.find('button').simulate('click')
      expect(onButtonClick).to.have.property('callCount', 1)
    })

    test('should show label', () => {
      const wrapper = enzymeUtil.mountEmbedded(<Button label="test"/>)
      expect(wrapper.find('button').text()).to.equal('test')
    })

    test('should show children if no label is provided', () => {
      const child = 'test123'
      const wrapper = enzymeUtil.mountEmbedded(<Button>{child}</Button>)
      expect(wrapper.find('button').text()).to.equal(child)
    })

    test('should be disabled and hidden', () => {
      let wrapper = enzymeUtil.mountEmbedded(<Button/>)
      expect(wrapper.find('button')).to.not.have.property('disabled')

      wrapper = enzymeUtil.mountEmbedded(<Button disabled={false}/>)
      expect(wrapper.find('button')).to.not.have.property('disabled')

      wrapper = enzymeUtil.mountEmbedded(<Button disabled/>)
      expect(wrapper.find('button')).to.be.disabled()
    })

    test('should show pending spinner', () => {
      let wrapper = enzymeUtil.mountEmbedded(<Button/>)
      expect(wrapper.find(IconTocco)).to.have.length(0)

      wrapper = enzymeUtil.mountEmbedded(<Button pending={false}/>)
      expect(wrapper.find(IconTocco)).to.have.length(0)

      wrapper = enzymeUtil.mountEmbedded(<Button pending/>)
      expect(wrapper.find(IconTocco)).to.have.length(1)
    })

    test('should show icon', () => {
      const wrapper = enzymeUtil.mountEmbedded(<Button icon="icon"/>)
      expect(wrapper.find(Icon)).to.have.length(1)
    })

    test('should set default type to button', () => {
      const wrapper = enzymeUtil.mountEmbedded(<Button/>)
      expect(wrapper.find('button').prop('type')).to.equal('button')
    })

    test('should set type', () => {
      const wrapper = enzymeUtil.mountEmbedded(<Button type="submit"/>)
      expect(wrapper.find('button').prop('type')).to.equal('submit')
    })
  })
})
