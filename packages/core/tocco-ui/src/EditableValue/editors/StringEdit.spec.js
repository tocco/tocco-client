import {screen, fireEvent, waitFor} from '@testing-library/react'
import {testingLibrary} from 'tocco-test-util'

import StringEdit from './StringEdit'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('editors', () => {
      describe('StringEdit ', () => {
        test('should show input with value', () => {
          const spy = sinon.spy()

          testingLibrary.renderWithIntl(<StringEdit onChange={spy} value="TEST" />)

          expect(screen.getByRole('textbox').value).to.eql('TEST')
        })

        test('should handle undefined value', () => {
          const spy = sinon.spy()
          testingLibrary.renderWithIntl(<StringEdit onChange={spy} />)

          expect(screen.getByRole('textbox').value).to.eql('')
        })

        test('should call onChange', async () => {
          const spy = sinon.spy()
          const newValue = 'newValue'

          testingLibrary.renderWithIntl(<StringEdit onChange={spy} />)

          fireEvent.change(screen.getByRole('textbox'), {target: {value: newValue}})

          await waitFor(() => {
            expect(spy).to.have.been.calledOnce
          })

          expect(spy).to.have.been.calledWith(newValue)
        })
      })
    })
  })
})
