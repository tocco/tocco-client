/* eslint-disable react/prop-types */
import {mount} from 'enzyme'
import {act} from 'react-dom/test-utils'

import Debouncer from './Debouncer'

describe('tocco-util', () => {
  describe('react', () => {
    describe('useDebounce', () => {
      let clock

      beforeEach(() => {
        clock = sinon.useFakeTimers()
      })

      afterEach(() => {
        clock.restore()
      })

      const TestComponent = Debouncer(({value, onChange, xy}) => {
        return (
          <div>
            {' '}
            <input value={value} onChange={e => onChange(e.target.value)} /> {xy}{' '}
          </div>
        )
      }, 100)

      test('should debounce value change of wrapped component', async () => {
        const initialValue = 'Test'
        const onChangeSpy = sinon.spy()

        const wrapper = mount(<TestComponent value={initialValue} onChange={onChangeSpy} />)

        const input = wrapper.find('input')

        input.simulate('change', {target: {value: 'Test1'}})
        input.simulate('change', {target: {value: 'Test2'}})

        act(() => {
          clock.tick(200)
        })

        input.simulate('change', {target: {value: 'Test3'}})
        input.simulate('change', {target: {value: 'Test4'}})

        act(() => {
          clock.tick(200)
        })

        expect(onChangeSpy).to.have.been.calledTwice
        expect(onChangeSpy).to.have.been.calledWith('Test2')
        expect(onChangeSpy).to.have.been.calledWith('Test4')
      })

      test('should pass other props', async () => {
        const wrapper = mount(<TestComponent value="" onChange={() => {}} xy="123" />)

        expect(wrapper.html()).to.have.string('123')
      })

      test('should support custom change function name', async () => {
        const initialValue = 'Test'
        const onChangeSpy = sinon.spy()

        const TestComponent2 = Debouncer(
          ({value, onSearch, xy}) => {
            return (
              <div>
                {' '}
                <input value={value} onChange={e => onSearch(e.target.value)} /> {xy}{' '}
              </div>
            )
          },
          100,
          'onSearch'
        )

        const wrapper = mount(<TestComponent2 value={initialValue} onSearch={onChangeSpy} />)

        const input = wrapper.find('input')

        input.simulate('change', {target: {value: 'Test1'}})
        input.simulate('change', {target: {value: 'Test2'}})

        act(() => {
          clock.tick(200)
        })

        input.simulate('change', {target: {value: 'Test3'}})
        input.simulate('change', {target: {value: 'Test4'}})
      })
    })
  })
})
