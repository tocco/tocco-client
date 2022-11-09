import {screen, render, fireEvent} from '@testing-library/react'
import {userAgent} from 'tocco-util'

import TextareaAutosize from './TextareaAutosize'

describe('tocco-ui', () => {
  describe('TextareaAutosize', () => {
    test('should have replicated value', () => {
      const value = 'abcd'

      render(<TextareaAutosize value={value} />)

      expect(screen.getByRole('textbox').value).equals(value)
      expect(screen.getByTestId('replicated-test').getAttribute('data-replicated-value')).equal(value)
    })

    test('should skip replicated value for Safari', () => {
      const stub = sinon.stub(userAgent, 'isSafari').returns(true)
      const value = 'abcd'

      render(<TextareaAutosize value={value} />)
      stub.restore()

      expect(screen.getByTestId('replicated-test').getAttribute('data-replicated-value')).equal(null)
      expect(screen.getByRole('textbox').value).equals(value)
    })

    test('should update replicated value', () => {
      const clock = sinon.useFakeTimers()
      const value = 'abcd'
      const {rerender} = render(<TextareaAutosize value={value} />)

      rerender(<TextareaAutosize value="test" />)
      clock.tick(1000)

      expect(screen.getByRole('textbox').value).equals('test')
      expect(screen.getByTestId('replicated-test').getAttribute('data-replicated-value')).equal('test')
    })

    test('should invoke onChange handler', () => {
      const onChangeHandler = sinon.spy()
      const value = 'abcd'
      render(<TextareaAutosize value={value} onChange={onChangeHandler} />)

      const textAreaConst = screen.getByRole('textbox')
      fireEvent.change(textAreaConst, {target: {value: 'test'}})

      expect(onChangeHandler).to.have.been.calledOnce
    })
  })
})
