/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react'
import {mount} from 'enzyme'

import useDebounce from './useDebounce'

describe('tocco-util', () => {
  describe('hooks', () => {
    describe('useDebounce', () => {
      test('should call onChange callback debounced', async() => {
        const initialValue = 'Test'

        const onChangeSpy = sinon.spy()

        const TestComponent = props => {
          const [internalValue, setInternalValue] = useState(props.value)
          const debouncedValue = useDebounce(internalValue, 100)

          useEffect(() => {
            props.onChange(debouncedValue)
          }, [debouncedValue])

          return <input onChange={e => setInternalValue(e.target.value)} value={props.value}/>
        }

        const wrapper = mount(<TestComponent onChange={onChangeSpy} value={initialValue}/>)

        const input = wrapper.find('input')

        input.simulate('change', {target: {value: 'Test1'}})
        input.simulate('change', {target: {value: 'Test2'}})

        await new Promise(resolve => setTimeout(() => {
          input.simulate('change', {target: {value: 'Test3'}})
          input.simulate('change', {target: {value: 'Test4'}})
          resolve()
        }, 130))

        await new Promise(resolve => setTimeout(() => {
          expect(onChangeSpy).to.have.been.calledThrice
          expect(onChangeSpy).to.have.been.calledWith(initialValue)
          expect(onChangeSpy).to.have.been.calledWith('Test2')
          expect(onChangeSpy).to.have.been.calledWith('Test4')
          resolve()
        }, 130))
      })
    })
  })
})
