import React from 'react'
import {mount} from 'enzyme'
import Duration from './Duration'

const EMPTY_FUNC = () => {}

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeEditors', () => {
      describe('Duration ', () => {
        const implyTargetObject = value => {
          return {target: {value: value, validity: {valid: true}, select: EMPTY_FUNC}}
        }
        it('should render two inputs', () => {
          const wrapper = mount(
            <Duration value={3720000} onChange={EMPTY_FUNC}/>
          )
          expect(wrapper.find('input')).to.have.length(2)
        })

        it('should display value in hours and minutes', () => {
          const wrapper = mount(
            <Duration value={3720000} onChange={EMPTY_FUNC}/>
          )
          expect(wrapper.find('input').first()).to.have.value('1')
          expect(wrapper.find('input').at(1)).to.have.value('2')
        })

        it('should call onChange with milliseconds', () => {
          const onInputSpy = sinon.spy()
          const wrapper = mount(
            <Duration value={60000} onChange={onInputSpy}/>
          )
          const timeTestInput = '1'
          wrapper.find('input').first().simulate('input', implyTargetObject(timeTestInput))
          expect(onInputSpy).to.be.calledWith(3660000)
        })

        it('should call onChange with NaN on invalid input', () => {
          const onInputSpy = sinon.spy()
          const wrapper = mount(
            <Duration value={0} onChange={onInputSpy}/>
          )
          const invalidInput = '..'
          wrapper.find('input').first().simulate('input', implyTargetObject(invalidInput))
          expect(onInputSpy).to.be.calledWith(NaN)
        })
      })
    })
  })
})
