import {screen} from '@testing-library/react'
import {testingLibrary} from 'tocco-test-util'

import DocsTreeSearch from './DocsTreeSearch'

describe('app-extensions', () => {
  describe('formData', () => {
    describe('advancedSearch', () => {
      describe('DocsTreeSearch', () => {
        test('should render DocsApp', () => {
          const DocsApp = () => <div data-testid="docs-browser">DocsApp</div>
          testingLibrary.renderWithIntl(<DocsTreeSearch DocsApp={DocsApp} entityName="Folder" emitAction={() => {}} />)
          expect(screen.getByTestId('docs-browser')).to.exist
        })

        test('should map id selection to dms selection', () => {
          // eslint-disable-next-line react/prop-types
          const DocsApp = ({initialSelection}) => (
            <div data-testid="docs-browser">
              <div data-testid="initialSelection">{JSON.stringify(initialSelection)}</div>
            </div>
          )

          testingLibrary.renderWithIntl(<DocsTreeSearch DocsApp={DocsApp} entityName="Folder" selection={['2', '3']} />)

          expect(screen.getByTestId('initialSelection').textContent).to.has.eql('["Folder/2","Folder/3"]')
        })

        test('should apply selection for defined entity', () => {
          // eslint-disable-next-line react/prop-types
          const DocsApp = ({selectionFilterFn}) => (
            <div data-testid="docs-browser">
              <div data-testid="selectionFilterFn-Folder">{selectionFilterFn({type: 'Folder'}) ? 'true' : 'false'}</div>
              <div data-testid="selectionFilterFn-Resource">
                {selectionFilterFn({type: 'Resource'}) ? 'true' : 'false'}
              </div>
            </div>
          )

          testingLibrary.renderWithIntl(<DocsTreeSearch DocsApp={DocsApp} entityName="Folder" />)

          expect(screen.getByTestId('selectionFilterFn-Folder').textContent).to.has.eql('true')
          expect(screen.getByTestId('selectionFilterFn-Resource').textContent).to.has.eql('false')
        })

        test('should map dms selection to id selection', () => {
          const onSelectionChangeSpy = sinon.spy()
          const selectedFolder = ['Folder/1', 'Folder/2']

          // eslint-disable-next-line react/prop-types
          const DocsApp = ({onSelectChange}) => {
            onSelectChange(selectedFolder)
            return <div data-testid="docs-browser"></div>
          }

          testingLibrary.renderWithIntl(
            <DocsTreeSearch DocsApp={DocsApp} entityName="Folder" onSelectionChange={onSelectionChangeSpy} />
          )

          expect(onSelectionChangeSpy).to.has.been.calledWith(['1', '2'])
        })
      })
    })
  })
})
