import {screen, render, fireEvent} from '@testing-library/react'

import EditorProvider from './EditorProvider'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('typeFormatterProvider', () => {
      test('should render a type and set props', () => {
        render(<EditorProvider componentType="string" value="test" />)

        expect(screen.getByRole('textbox')).exist
        expect(screen.getByDisplayValue('test')).exist
      })

      test('should attach events', () => {
        const blurSpy = sinon.spy()
        const focusSpy = sinon.spy()

        const events = {
          onBlur: blurSpy,
          onFocus: focusSpy
        }
        render(<EditorProvider componentType="string" value="test" events={events} />)

        fireEvent.focus(screen.getAllByRole('textbox')[0])
        expect(focusSpy).to.have.calledOnce

        fireEvent.blur(screen.getAllByRole('textbox')[0])
        expect(blurSpy).to.have.calledOnce
      })
    })
  })
})
