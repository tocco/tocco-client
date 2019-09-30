/* eslint-disable react/prop-types */
import React from 'react'
import {mount} from 'enzyme'

import Debouncer from './Debouncer'

describe('tocco-util', () => {
  describe('react', () => {
    describe('useDebounce', () => {
      const TestComponent = Debouncer(({value, onChange, xy}) => {
        return <div> <input value={value} onChange={e => onChange(e.target.value)}/> {xy} </div>
      }, 100)

      test('should debounce value change of wrapped component', async() => {
        const initialValue = 'Test'
        const onChangeSpy = sinon.spy()

        const wrapper = mount(<TestComponent value={initialValue} onChange={onChangeSpy}/>)

        const input = wrapper.find('input')

        input.simulate('change', {target: {value: 'Test1'}})
        input.simulate('change', {target: {value: 'Test2'}})

        await new Promise(resolve => setTimeout(() => {
          input.simulate('change', {target: {value: 'Test3'}})
          input.simulate('change', {target: {value: 'Test4'}})
          resolve()
        }, 130))

        await new Promise(resolve => setTimeout(() => {
          expect(onChangeSpy).to.have.been.calledTwice
          expect(onChangeSpy).to.have.been.calledWith('Test2')
          expect(onChangeSpy).to.have.been.calledWith('Test4')
          resolve()
        }, 130))
      })

      test('should pass other props', async() => {
        const wrapper = mount(<TestComponent value="" onChange={() => {}} xy="123"/>)

        expect(wrapper.html()).to.have.string('123')
      })
    })
  })
})
