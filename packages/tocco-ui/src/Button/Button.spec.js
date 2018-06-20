import {mount, shallow} from 'enzyme'
import React from 'react'
import {ThemeProvider} from 'styled-components'

import Button from './Button'

const theme = {
  overlays: {
    disabled: {
      color: '#f00',
      opacity: 0.8
    }
  }
}

describe('tocco-ui', function() {
  describe('Button', function() {
    it('should handle click events', () => {
      const onButtonClick = sinon.spy()
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <Button onClick={onButtonClick}/>
        </ThemeProvider>
      )
      wrapper.find('button').simulate('click')
      expect(onButtonClick).to.have.property('callCount', 1)
    })

    it('should show label', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <Button label="test"/>
        </ThemeProvider>
      )
      expect(wrapper.find('button').text()).to.equal('test')
    })

    it('should add name property', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <Button name="test_name"/>
        </ThemeProvider>
      )
      expect(wrapper.find('button').prop('name')).to.equal('test_name')
    })

    it('should be disabled and hidden', () => {
      let wrapper = mount(
        <ThemeProvider theme={theme}>
          <Button/>
        </ThemeProvider>
      )
      expect(wrapper.find('button')).to.not.have.property('disabled')

      wrapper = mount(
        <ThemeProvider theme={theme}>
          <Button disabled={false}/>
        </ThemeProvider>
      )
      expect(wrapper.find('button')).to.not.have.property('disabled')

      wrapper = mount(
        <ThemeProvider theme={theme}>
          <Button disabled/>
        </ThemeProvider>
      )
      expect(wrapper.find('button')).to.be.disabled()
    })

    it('should show pending spinner', () => {
      let wrapper = mount(
        <ThemeProvider theme={theme}>
          <Button/>
        </ThemeProvider>
      )
      expect(wrapper.find('Icon')).to.have.length(0)

      wrapper = mount(
        <ThemeProvider theme={theme}>
          <Button pending={false}/>
        </ThemeProvider>
      )
      expect(wrapper.find('Icon')).to.have.length(0)

      wrapper = mount(
        <ThemeProvider theme={theme}>
          <Button pending/>
        </ThemeProvider>
      )
      expect(wrapper.find('Icon').prop('animation')).to.equal('spin')
      expect(wrapper.find('Icon').prop('icon')).to.equal('fa-spinner')
    })

    it('should show icon', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <Button icon="icon"/>
        </ThemeProvider>
      )
      expect(wrapper.find('Icon')).to.have.length(1)
    })

    it('should set default type to button', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <Button/>
        </ThemeProvider>
      )
      expect(wrapper.find('button').prop('type')).to.equal('button')
    })

    it('should set type', () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <Button type="submit"/>
        </ThemeProvider>
      )
      expect(wrapper.find('button').prop('type')).to.equal('submit')
    })

    it('should have four defaultProps', () => {
      /* wrapper.props() and wrapper.instance().props does not list label and iconPosition */
      const wrapper = shallow(
        <ThemeProvider theme={theme}>
          <Button/>
        </ThemeProvider>
      )
      const {iconPosition, look, type} = wrapper.props()
      const {ink} = wrapper.dive().props()
      expect(iconPosition).to.equal('before')
      expect(ink).to.equal('base')
      expect(look).to.equal('flat')
      expect(type).to.equal('button')
    })
  })
})
