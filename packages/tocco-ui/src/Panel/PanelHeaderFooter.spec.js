
import React from 'react'
import PanelHeaderFooter from './PanelHeaderFooter'
import Button from '../Button'
import StyledPanelHeaderFooter from './StyledPanelHeaderFooter'
import {shallow} from 'enzyme'

describe('tocco-ui', function() {
  describe('PanelHeaderFooter', function() {
    it('should render parent and children', () => {
      const wrapper = shallow(
        <PanelHeaderFooter
          isToggleable={true}
          showToggler={true}
        >
          <span>child-1</span>
          <span>child-2</span>
        </PanelHeaderFooter>
      )
      expect(wrapper.find(StyledPanelHeaderFooter)).to.have.length(1)
      expect(wrapper.find('div')).to.have.length(1)
      expect(wrapper.find('span')).to.have.length(2)
      expect(wrapper.find('span').first().text()).to.equal('child-1')
      expect(wrapper.find('span').last().text()).to.equal('child-2')
    })

    it('should hide or display button according precondition', () => {
      let wrapper = shallow(
        <PanelHeaderFooter
          isToggleable={true}
          showToggler={true}
        />
      )
      expect(wrapper.find(Button)).to.have.length(1)

      wrapper = shallow(
        <PanelHeaderFooter
          isToggleable={false}
          showToggler={true}
        />
      )
      expect(wrapper.find(Button)).to.have.length(0)

      wrapper = shallow(
        <PanelHeaderFooter
          isToggleable={true}
          showToggler={false}
        />
      )
      expect(wrapper.find(Button)).to.have.length(0)

      wrapper = shallow(
        <PanelHeaderFooter
          isToggleable={false}
          showToggler={false}
        />
      )
      expect(wrapper.find(Button)).to.have.length(0)
    })

    it('should display button correctly', () => {
      let wrapper = shallow(
        <PanelHeaderFooter
          isOpen={false}
          isToggleable={true}
          showToggler={true}
        />
      )
      expect(wrapper.find(Button).prop('icon')).to.be.equal('fa-plus')
      expect(wrapper.find(Button).prop('title')).to.be.equal('Show more information')

      wrapper = shallow(
        <PanelHeaderFooter
          isOpen={true}
          isToggleable={true}
          showToggler={true}
        />
      )
      expect(wrapper.find(Button).prop('icon')).to.be.equal('fa-minus')
      expect(wrapper.find(Button).prop('title')).to.be.equal('Hide information')
    })
  })
})
