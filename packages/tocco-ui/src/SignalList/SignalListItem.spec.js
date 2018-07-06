import {shallow} from 'enzyme'
import React from 'react'

import Icon from '../Icon'
import SignalListItem from './SignalListItem'

describe('tocco-ui', function() {
  describe('SignalListItem', function() {
    it('should have three defaultProps', () => {
      const wrapper = shallow(
        <SignalListItem label="Lorem ipsum"/>
      )
      const {condition} = wrapper.props()
      expect(condition).to.equal('base')
      const {position, animation} = wrapper.find(Icon).props()
      expect(position).to.equal('sole')
      expect(animation).to.equal('none')
    })

    it('should render label, icon and children', () => {
      const wrapper = shallow(
        <SignalListItem label="Lorem ipsum">
          <span/><span/>
        </SignalListItem>
      )
      expect(wrapper.dive().text()).to.be.equal('<Icon />Lorem ipsum')
      expect(wrapper.find('span')).to.have.length(2)
    })

    it('should show correct icon per condition', () => {
      let wrapper = shallow(
        <SignalListItem
          label="Lorem ipsum"
        />
      )
      expect(wrapper.find(Icon).prop('icon')).to.be.undefined
      expect(wrapper.find(Icon).prop('unicode')).to.equal('•')

      wrapper = shallow(
        <SignalListItem
          condition="base"
          label="Lorem ipsum"
        />
      )
      expect(wrapper.find(Icon).prop('icon')).to.be.undefined
      expect(wrapper.find(Icon).prop('unicode')).to.equal('•')

      wrapper = shallow(
        <SignalListItem
          condition="primary"
          label="Lorem ipsum"
        />
      )
      expect(wrapper.find(Icon).prop('icon')).to.be.undefined
      expect(wrapper.find(Icon).prop('unicode')).to.equal('•')

      wrapper = shallow(
        <SignalListItem
          condition="danger"
          label="Lorem ipsum"
        />
      )
      expect(wrapper.find(Icon).prop('icon')).to.equal('fa-times')
      expect(wrapper.find(Icon).prop('unicode')).to.be.undefined
      wrapper = shallow(
        <SignalListItem
          condition="success"
          label="Lorem ipsum"
        />
      )
      expect(wrapper.find(Icon).prop('icon')).to.equal('fa-check')
      expect(wrapper.find(Icon).prop('unicode')).to.be.undefined

      wrapper = shallow(
        <SignalListItem
          condition="warning"
          label="Lorem ipsum"
        />
      )
      expect(wrapper.find(Icon).prop('icon')).to.equal('fa-exclamation-triangle')
      expect(wrapper.find(Icon).prop('unicode')).to.be.undefined
    })
  })
})
