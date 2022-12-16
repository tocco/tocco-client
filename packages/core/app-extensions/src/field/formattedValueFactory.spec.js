import {screen} from '@testing-library/react'
import {testingLibrary} from 'tocco-test-util'

import formattedValueFactory from './formattedValueFactory'

describe('app-extensions', () => {
  describe('fomField', () => {
    describe('formattedValueFactory', () => {
      test('should return simple formattedValue', () => {
        const Field = formattedValueFactory('string')
        const formField = {dataType: 'string'}

        const value = 'test'

        testingLibrary.renderWithIntl(<Field value={value} formField={formField} />)

        expect(screen.queryByText(value)).to.exist
      })
    })

    test('should set value if type overwrites it', () => {
      const Field = formattedValueFactory('description')
      const text = 'Test'
      const formField = {
        componentType: 'description',
        mode: 'text',
        title: 'Title',
        text
      }

      testingLibrary.renderWithIntl(<Field value="Ignored" formField={formField} />)

      expect(screen.queryByText(text)).to.exist
    })

    test('should set options if type overwrites it', () => {
      const Field = formattedValueFactory('description')
      const title = 'Test'
      const mode = 'text'
      const formField = {
        componentType: 'description',
        mode,
        title,
        text: 'text'
      }

      testingLibrary.renderWithIntl(<Field value={null} formField={formField} />)

      // title is passed via options to DescriptionFormatter
      expect(screen.queryByText(title)).to.exist
    })
  })
})
