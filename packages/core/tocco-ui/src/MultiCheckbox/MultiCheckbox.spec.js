import {screen, render, fireEvent} from '@testing-library/react'

import MultiCheckbox from './MultiCheckbox'

describe('tocco-ui', () => {
  describe('MultiCheckbox', () => {
    test('should render input', () => {
      const cb = sinon.spy()
      render(<MultiCheckbox onChange={cb} />)
      expect(screen.getByRole('checkbox')).exist
    })

    test("should call onChange('checked') on status unchecked", () => {
      const cb = sinon.spy()
      render(<MultiCheckbox value="unchecked" onChange={cb} />)
      fireEvent.click(screen.getByRole('checkbox'))
      expect(cb).to.be.calledOnce
      expect(cb).to.have.been.calledWith('checked')
    })

    test("should call onChange('unchecked') on status checked", () => {
      const cb = sinon.spy()
      render(<MultiCheckbox value="checked" onChange={cb} />)
      fireEvent.click(screen.getByRole('checkbox'))
      expect(cb).to.be.calledOnce
      expect(cb).to.have.been.calledWith('unchecked')
    })

    test("should call onChange('unchecked') on status indeterminate", () => {
      const cb = sinon.spy()
      render(<MultiCheckbox value="indeterminate" onChange={cb} />)
      fireEvent.click(screen.getByRole('checkbox'))
      expect(cb).to.be.calledOnce
      expect(cb).to.have.been.calledWith('unchecked')
    })
  })
})
