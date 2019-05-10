import {mount} from 'enzyme'
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
      const wrapper = mount(<StatedValue error={{error: ['error']}}/>)
      expect(wrapper.find(StyledStatedValueBox).prop('signal')).to.be.undefined
      expect(wrapper.find(StyledStatedValueLabel).prop('signal')).to.be.undefined
    })

    test('should detect condition error if touched', () => {
      const wrapper = mount(<StatedValue error={{error: ['error']}} touched={true}/>)
      expect(wrapper.find(StyledStatedValueBox).prop('signal')).to.be.equal('danger')
      expect(wrapper.find(StyledStatedValueLabel).prop('signal')).to.be.equal('danger')
    })

    test('condition error should overrule condition dirty', () => {
      const wrapper = mount(
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

    test('should pass prop hasValue as secondaryPosition', () => {
      const wrapper = mount(<StatedValue hasValue={true} />)
      expect(wrapper.find(StyledStatedValueWrapper).prop('secondaryPosition')).to.be.true
      expect(wrapper.find(StyledStatedValueLabel).prop('secondaryPosition')).to.be.true
    })

    test('should show label', () => {
      const wrapper = mount(<StatedValue label="label a"/>)
      const el = wrapper.find(StyledStatedValueLabel)
      expect(el).to.have.length(1)
      expect(el.text()).to.be.equal('label a')
    })

    test('should add alt attribute to label', () => {
      const wrapper1 = mount(
        <StatedValue
          label="firstname"
          mandatoryTitle="input is required"
        />)
      const el1 = wrapper1.find(StyledStatedValueLabel)
      expect(el1).to.have.length(1)
      expect(el1.prop('alt')).to.be.equal('firstname')

      const wrapper2 = mount(
        <StatedValue
          label="lastname"
          mandatory={true}
          mandatoryTitle="input is required"
        />)
      const el2 = wrapper2.find(StyledStatedValueLabel)
      expect(el2).to.have.length(1)
      expect(el2.prop('alt')).to.be.equal('lastname, input is required')
    })

    test('should extend label if mandatory', () => {
      const wrapper = mount(<StatedValue label="label b" mandatory={true}/>)
      expect(wrapper.find(StyledStatedValueLabel).text()).to.be.equal('label b *')
    })

    test('should use prop id for htmlFor on label', () => {
      const wrapper = mount(<StatedValue id="target-element" />)
      const el = wrapper.find(StyledStatedValueLabel)
      expect(el.prop('htmlFor')).to.be.equal('target-element')
    })
  })
})
