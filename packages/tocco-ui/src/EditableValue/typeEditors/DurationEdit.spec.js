import React from 'react'
import {mount} from 'enzyme'

import Typography from '../../Typography'
import DurationEdit from './DurationEdit'

const EMPTY_FUNC = () => {}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('DurationEdit ', () => {
        const implyTargetObject = value => ({target: {value, validity: {valid: true}, select: EMPTY_FUNC}})

        test('should render two inputs', () => {
          const wrapper = mount(
            <DurationEdit value={3720000} onChange={EMPTY_FUNC}/>
          )
          expect(wrapper.find('input')).to.have.length(2)
        })

        test('should display value in hours and minutes', () => {
          const wrapper = mount(
            <DurationEdit value={3720000} onChange={EMPTY_FUNC}/>
          )
          expect(wrapper.find('input').at(0)).to.have.value('1')
          expect(wrapper.find('input').at(1)).to.have.value('2')
        })

        test('should call onChange with milliseconds', () => {
          const onInputSpy = sinon.spy()
          const wrapper = mount(
            <DurationEdit value={60000} onChange={onInputSpy}/>
          )
          const timeTestInput = '1'
          wrapper.find('input').first().simulate('input', implyTargetObject(timeTestInput))
          expect(onInputSpy).to.be.calledWith(3660000)
        })

        test('should call onChange with null on invalid input', () => {
          const onInputSpy = sinon.spy()
          const wrapper = mount(
            <DurationEdit value={0} onChange={onInputSpy}/>
          )
          const invalidInput = '..'
          const expectedCallValue = null
          wrapper.find('input').first().simulate('input', implyTargetObject(invalidInput))
          expect(onInputSpy).to.be.calledWith(expectedCallValue)
        })

        test('should display 59 on sub zero minutes input', () => {
          const onInputSpy = sinon.spy()
          const wrapper = mount(
            <DurationEdit value={null} onChange={onInputSpy}/>
          )
          const input = '-1'
          wrapper.find('input').at(1).simulate('input', implyTargetObject(input))
          expect(wrapper.find('input').at(1)).to.have.value('59')
        })

        test('should set readOnly prop to true', () => {
          const wrapper = mount(
            <DurationEdit value={null} onChange={EMPTY_FUNC} readOnly/>
          )
          expect(wrapper.props().readOnly).to.eql(true)
        })

        test('should always show units', () => {
          const wrapper = mount(
            <DurationEdit value={0} onChange={EMPTY_FUNC}/>
          )
          expect(wrapper.find(Typography.Span)).to.have.length(2)
          expect(wrapper.state('showUnits')).to.be.true
        })

        test('should show and hide units', () => {
          const wrapper = mount(
            <DurationEdit onChange={EMPTY_FUNC}/>
          )
          expect(wrapper.find(Typography.Span)).to.have.length(0)
          expect(wrapper.state('showUnits')).to.be.false
          wrapper.instance().handleOnFocus()
          expect(wrapper.state('showUnits')).to.be.true
          wrapper.instance().handleOnBlur()
          expect(wrapper.state('showUnits')).to.be.false
        })
      })
    })
  })
})
