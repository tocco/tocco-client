import {mount, shallow} from 'enzyme'
import React from 'react'

import StatedValue from './StatedValue'
import {
  StyledStatedValueBox,
  StyledStatedValueDescription,
  StyledStatedValueLabel,
  StyledStatedValueWrapper
} from './StyledStatedValue'

describe('tocco-ui', () => {
  describe('StatedValue', () => {
    test('should show content', () => {
      const wrapper = mount(<StatedValue><input key="StatedValueContent"/></StatedValue>)
      expect(wrapper.find(StyledStatedValueBox).children().children().children()).to.have.length(2)
      expect(wrapper.find('input')).to.have.length(1)
    })

    test('should not have content', () => {
      const wrapper = mount(<StatedValue />)
      expect(wrapper.find(StyledStatedValueBox).children().children().children()).to.have.length(1)
    })

    test('should show description', () => {
      const wrapper = mount(<StatedValue description="description"/>)
      const el = wrapper.find(StyledStatedValueDescription)
      expect(el).to.have.length(1)
      expect(el.text('description')).to.be.equal('description')
    })

    test('should not have description', () => {
      const wrapper = mount(<StatedValue/>)
      expect(wrapper.find(StyledStatedValueDescription)).to.have.length(0)
    })

    test('should detect condition dirty', () => {
      const wrapper = mount(<StatedValue dirty={true} />)
      expect(wrapper.find(StyledStatedValueBox).prop('signal')).to.be.equal('warning')
      expect(wrapper.find(StyledStatedValueLabel).prop('signal')).to.be.equal('warning')
    })

    test('should not detect condition error if not touched', () => {
      const wrapper = shallow(<StatedValue error={{error: ['error']}}/>)
      expect(wrapper.find(StyledStatedValueBox).prop('signal')).to.be.undefined
      expect(wrapper.find(StyledStatedValueLabel).prop('signal')).to.be.undefined
    })

    test('should detect condition error if touched', () => {
      const wrapper = shallow(<StatedValue error={{error: ['error']}} touched={true}/>)
      expect(wrapper.find(StyledStatedValueBox).prop('signal')).to.be.equal('danger')
      expect(wrapper.find(StyledStatedValueLabel).prop('signal')).to.be.equal('danger')
    })

    test('condition error should overrule condition dirty', () => {
      const wrapper = shallow(
        <StatedValue
          dirty={true}
          error={{error: ['error']}}
          touched={true}/>)
      expect(wrapper.find(StyledStatedValueBox).prop('signal')).to.be.equal('danger')
      expect(wrapper.find(StyledStatedValueLabel).prop('signal')).to.be.equal('danger')
    })

    test('should list errors', () => {
      const wrapper = mount(
        <StatedValue
          dirty={true}
          error={{error1: ['error 1-1', 'error 1-2'], error2: ['error 2']}}
          touched={true}/>)
      const el = wrapper.find('li')
      expect(el).to.have.length(3)
      expect(el.first().text()).to.be.equal('error 1-1')
      expect(el.last().text()).to.be.equal('error 2')
    })

    test('should pass prop hasValue', () => {
      const wrapper = mount(<StatedValue hasValue={true} />)
      expect(wrapper.find(StyledStatedValueWrapper).prop('hasValue')).to.be.true
      expect(wrapper.find(StyledStatedValueLabel).prop('hasValue')).to.be.true
    })

    test('should show label', () => {
      const wrapper = mount(<StatedValue label="label a"/>)
      const el = wrapper.find(StyledStatedValueLabel)
      expect(el).to.have.length(1)
      expect(el.text()).to.be.equal('label a')
    })

    test('should extend label if mandatory', () => {
      const wrapper = mount(<StatedValue label="label b" mandatory={true}/>)
      expect(wrapper.find(StyledStatedValueLabel).text()).to.be.equal('label b *')
    })

    test('should use prop id for htmlFor on label', () => {
      const wrapper = mount(<StatedValue id="target-element" />)
      expect(wrapper.find(StyledStatedValueLabel).prop('htmlFor')).to.be.equal('target-element')
    })
  })
})
