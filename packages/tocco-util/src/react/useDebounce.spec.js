/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react'
import {mount} from 'enzyme'
import {act} from 'react-dom/test-utils'

import useDebounce from './useDebounce'

describe('tocco-util', () => {
  describe('hooks', () => {
    describe('useDebounce', () => {
      let clock

      beforeEach(() => {
        clock = sinon.useFakeTimers()
      })

      afterEach(() => {
        clock.restore()
      })

      test('should call onChange callback debounced', async() => {
        const initialValue = 'Test'

        const onChangeSpy = sinon.spy()

        const TestComponent = props => {
          const [internalValue, setInternalValue] = useState(props.value)
          const [debouncedValue] = useDebounce(internalValue, 100)

          useEffect(() => {
            props.onChange(debouncedValue)
          }, [debouncedValue])

          return <input onChange={e => setInternalValue(e.target.value)} value={props.value}/>
        }

        const wrapper = mount(<TestComponent onChange={onChangeSpy} value={initialValue}/>)

        const input = wrapper.find('input')

        input.simulate('change', {target: {value: 'Test1'}})
        input.simulate('change', {target: {value: 'Test2'}})

        act(() => {
          clock.tick(100)
        })

        input.simulate('change', {target: {value: 'Test3'}})
        input.simulate('change', {target: {value: 'Test4'}})

        act(() => {
          clock.tick(100)
        })

        expect(onChangeSpy).to.have.been.calledThrice
        expect(onChangeSpy).to.have.been.calledWith(initialValue)
        expect(onChangeSpy).to.have.been.calledWith('Test2')
        expect(onChangeSpy).to.have.been.calledWith('Test4')
      })

      test('should be able to reset debounce value from outside anytime', async() => {
        const initialValue = 'Test'

        const TestComponent = props => {
          const [debouncedValue, setDebouncedValue] = useDebounce(props.value, 100)

          return <input onChange={e => setDebouncedValue(e.target.value)} value={debouncedValue}/>
        }

        const wrapper = mount(<TestComponent value={initialValue}/>)

        wrapper.find('input').simulate('change', {target: {value: 'Test1'}})
        expect(wrapper.find('input').prop('value')).to.eql('Test1')
        
        wrapper.find('input').simulate('change', {target: {value: 'Test2'}})
        expect(wrapper.find('input').prop('value')).to.eql('Test2')
      })
    })
  })
})
