import {screen, render} from '@testing-library/react'

import EditableValue from './'

describe('tocco-ui', () => {
  describe('EditableValue', () => {
    describe('<EditableValue>', () => {
      test('should export component that', () => {
        const testValue = 'test'

        render(<EditableValue type="string" value={testValue} />)
        expect(screen.getByDisplayValue(testValue)).exist
      })
    })
  })
})
