import {shallow} from 'enzyme'
import React from 'react'

import Icon from '../Icon'
import SignalListItem from './SignalListItem'

describe('tocco-ui', function() {
  describe('SignalListItem', function() {
    it('should have 1 defaultProps', () => {
      const wrapper = shallow(
        <SignalListItem />
      )
      const {condition} = wrapper.props()
      expect(condition).to.equal('base')
    })

    it('should render label, icon and children', () => {
      const wrapper = shallow(
        <SignalListItem label="Lorem ipsum">
          <span/><span/>
        </SignalListItem>
      )
      expect(wrapper.dive()).to.contain.text('Lorem ipsum')
      expect(wrapper.find('i')).to.have.length(1)
      expect(wrapper.find('span')).to.have.length(2)
    })

    it('should show correct icon per condition', () => {
      let wrapper = shallow(
        <SignalListItem
          label="Lorem ipsum"
        />
      )
      expect(wrapper.find('i').text()).to.equal('•')

      wrapper = shallow(
        <SignalListItem
          condition="base"
          label="Lorem ipsum"
        />
      )
      expect(wrapper.find('i').text()).to.equal('•')

      wrapper = shallow(
        <SignalListItem
          condition="primary"
          label="Lorem ipsum"
        />
      )
      expect(wrapper.find('i').text()).to.equal('•')

      wrapper = shallow(
        <SignalListItem
          condition="danger"
          label="Lorem ipsum"
        />
      )
      expect(wrapper.find(Icon).prop('icon')).to.equal('times')
      expect(wrapper.find(Icon).prop('position')).to.equal('sole')

      wrapper = shallow(
        <SignalListItem
          condition="success"
          label="Lorem ipsum"
        />
      )
      expect(wrapper.find(Icon).prop('icon')).to.equal('check')
      expect(wrapper.find(Icon).prop('position')).to.equal('sole')

      wrapper = shallow(
        <SignalListItem
          condition="warning"
          label="Lorem ipsum"
        />
      )
      expect(wrapper.find(Icon).prop('icon')).to.equal('exclamation-triangle')
      expect(wrapper.find(Icon).prop('position')).to.equal('sole')
    })
  })
})
