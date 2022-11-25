import {screen, fireEvent} from '@testing-library/react'
import {testingLibrary, IntlStub} from 'tocco-test-util'

import Log from './Log'

describe('log', () => {
  describe('components', () => {
    describe('Log', () => {
      const fileContent = {fileContent: "Checking index for entity-manager: 'Membership'", hostName: 'loho'}
      const logFiles = ['einRichtigLangerName.log', 'nice.log']
      const fetchDataConfig = sinon.spy()
      const fetchFileContentConfig = sinon.spy()
      test('should show all inputs, textarea and reload-button', () => {
        testingLibrary.renderWithIntl(
          <Log
            data={logFiles}
            fileContent={fileContent}
            fetchData={fetchDataConfig}
            fetchFileContent={fetchFileContentConfig}
            intl={IntlStub}
          ></Log>
        )

        expect(screen.getByText("Checking index for entity-manager: 'Membership'")).exist
        expect(screen.getByRole('button')?.textContent).contain('client.log.reload')
        expect(screen.getByText('client.log.hostname')).exist
        expect(screen.getByText('client.log.filecount')).exist
        expect(screen.getByText('client.log.logfile')).exist
        expect(screen.getByText('nice.log')).exist
      })
      test('should trigger both fetch-functions', () => {
        const fetchDataConfigTest = sinon.spy()
        const fetchFileContentConfigTest = sinon.spy()
        testingLibrary.renderWithIntl(
          <Log
            data={logFiles}
            fileContent={fileContent}
            fetchData={fetchDataConfigTest}
            fetchFileContent={fetchFileContentConfigTest}
            intl={IntlStub}
          />
        )

        expect(fetchDataConfigTest).to.have.been.calledOnce
        expect(fetchFileContentConfigTest).to.have.been.calledOnce
      })
      test('should show textarea without value', () => {
        const noContent = {fileContent: '', hostName: 'loho'}
        testingLibrary.renderWithIntl(
          <Log
            data={logFiles}
            fileContent={noContent}
            fetchData={fetchDataConfig}
            fetchFileContent={fetchFileContentConfig}
            intl={IntlStub}
          />
        )

        const inputFields = screen.getAllByRole('textbox')

        expect(inputFields).to.have.length(3)
        expect(screen.getByRole('button')?.textContent).contain('client.log.reload')
        expect(screen.getByText('client.log.hostname')).exist
        expect(screen.getByText('client.log.filecount')).exist
        expect(screen.getByText('client.log.logfile')).exist
        expect(screen.getByText('nice.log')).exist
      })
      test('should click the button and trigger fetchFileContent twice', () => {
        const fetchDataConfigTest = sinon.spy()
        const fetchFileContentConfigTest = sinon.spy()
        testingLibrary.renderWithIntl(
          <Log
            data={logFiles}
            fileContent={fileContent}
            fetchData={fetchDataConfigTest}
            fetchFileContent={fetchFileContentConfigTest}
            intl={IntlStub}
          />
        )
        fireEvent.click(screen.getByRole('button'))

        expect(fetchDataConfigTest).to.have.been.calledOnce
        expect(fetchFileContentConfigTest).to.have.been.calledTwice
      })
    })
  })
})
