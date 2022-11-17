import {screen} from '@testing-library/react'
import {testingLibrary} from 'tocco-test-util'

import AdvancedSearch from './AdvancedSearch'

describe('app-extensions', () => {
  describe('formData', () => {
    describe('advancedSearch', () => {
      describe('AdvancedSearch', () => {
        test('should render ListApp', () => {
          const ListApp = () => <div data-testid="entity-list">ListApp</div>
          testingLibrary.renderWithIntl(
            <AdvancedSearch ListApp={ListApp} entityName="User" formName="User" emitAction={() => {}} />
          )
          expect(screen.getByTestId('entity-list')).to.exist
        })
      })
    })
  })
})
