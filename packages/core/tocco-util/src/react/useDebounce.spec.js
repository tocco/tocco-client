/* eslint-disable react/prop-types */
import {mount} from 'enzyme'
import {useEffect, useState} from 'react'

import useDebounce from './useDebounce'

describe('tocco-util', () => {
  describe('hooks', () => {
    describe('useDebounce', () => {
      test('should call onChange callback debounced', async () => {
        const initialValue = 'Test'

        const onChangeSpy = sinon.spy()

        const TestComponent = ({value, onChange}) => {
          const [internalValue, setInternalValue] = useState(value)
          const debouncedValue = useDebounce(internalValue, 100)

          useEffect(() => {
            onChange(debouncedValue)
          }, [debouncedValue, onChange])

          return <input onChange={e => setInternalValue(e.target.value)} value={value} />
        }

        const wrapper = mount(<TestComponent onChange={onChangeSpy} value={initialValue} />)

        const input = wrapper.find('input')

        input.simulate('change', {target: {value: 'Test1'}})
        input.simulate('change', {target: {value: 'Test2'}})

        await new Promise(resolve =>
          setTimeout(() => {
            input.simulate('change', {target: {value: 'Test3'}})
            input.simulate('change', {target: {value: 'Test4'}})
            resolve()
          }, 250)
        )

        await new Promise(resolve =>
          setTimeout(() => {
            expect(onChangeSpy).to.have.been.calledThrice
            expect(onChangeSpy).to.have.been.calledWith(initialValue)
            expect(onChangeSpy).to.have.been.calledWith('Test2')
            expect(onChangeSpy).to.have.been.calledWith('Test4')
            resolve()
          }, 250)
        )
      })
    })
  })
})
