import {screen, waitFor} from '@testing-library/react'
import {testingLibrary} from 'tocco-test-util'

import editableValueFactory from './editableValueFactory'

describe('app-extensions', () => {
  describe('formField', () => {
    describe('editableValueFactory', () => {
      test('should return simple editableValue', () => {
        const Field = editableValueFactory('string')

        const formField = {}
        const modelField = {}
        const formName = 'detailForm'
        const value = 'test'
        const info = {mandatory: false, readOnly: false}
        const onChangeSpy = sinon.spy()
        const events = {onChange: onChangeSpy}

        testingLibrary.renderWithIntl(
          <Field
            formField={formField}
            modelField={modelField}
            formName={formName}
            value={value}
            info={info}
            events={events}
          />
        )

        const inputElement = screen.getByRole('textbox')

        expect(inputElement).to.exist
        expect(inputElement).to.have.property('value', 'test')
      })

      test('should return range component if requested', async () => {
        const Field = editableValueFactory('number')

        const formField = {
          expanded: true
        }
        const modelField = {}
        const formName = 'searchForm'
        const value = {isRangeValue: true, from: 3, to: 6}
        const info = {mandatory: false, readOnly: false}
        const onChangeSpy = sinon.spy()
        const events = {onChange: onChangeSpy}
        const formData = {
          intl: {
            formatMessage: obj => obj.id
          }
        }

        testingLibrary.renderWithIntl(
          <Field
            formField={formField}
            modelField={modelField}
            formName={formName}
            value={value}
            info={info}
            events={events}
            formData={formData}
            range
          />
        )

        const collapseButton = await waitFor(() => screen.getByTestId('icon-square-minus'))

        const fromElement = screen.queryByPlaceholderText('client.component.range.from')
        const toElement = screen.queryByPlaceholderText('client.component.range.to')

        expect(fromElement).to.exist
        expect(fromElement).to.have.property('value', '3')

        expect(toElement).to.exist
        expect(toElement).to.have.property('value', '6')

        expect(collapseButton).to.exist
      })
    })
  })
})
