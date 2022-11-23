import {screen, fireEvent} from '@testing-library/react'
import {expect} from 'chai'
import {IntlStub, testingLibrary} from 'tocco-test-util'

import Configuration from './Configuration'

describe('reload-configuration', () => {
  describe('components', () => {
    describe('Configuration', () => {
      test('should check if the right content is printed with one set of data', () => {
        testingLibrary.renderWithIntl(
          <Configuration
            data={[
              {
                name: 'reports',
                id: 'reports'
              },
              {
                name: 'data',
                id: 'data'
              },
              {
                name: 'form',
                id: 'form'
              },
              {
                name: 'cms',
                id: 'cms'
              },
              {
                name: 'textresources',
                id: 'textresources'
              },
              {
                name: 'menu',
                id: 'menu'
              },
              {
                name: 'acl',
                id: 'acl'
              }
            ]}
            fetchData={() => {}}
            intl={IntlStub}
            postData={() => {}}
            isLoading={false}
          />
        )

        expect(screen.getAllByText('client.actions.reload-configuration.menu')).to.have.length(1)
        expect(screen.getAllByText('client.actions.reload-configuration.reports')).to.have.length(1)
        expect(screen.getAllByText('client.actions.reload-configuration.acl')).to.have.length(1)
        expect(screen.getAllByText('client.actions.reload-configuration.textresources')).to.have.length(1)
        expect(screen.getAllByText('client.actions.reload-configuration.cms')).to.have.length(1)
        expect(screen.getAllByText('client.actions.reload-configuration.form')).to.have.length(1)
        expect(screen.getAllByText('client.actions.reload-configuration.reload.chosen')).to.have.length(1)
        expect(screen.getAllByText('client.actions.reload-configuration.reload.all')).to.have.length(1)
        expect(screen.getAllByText('client.actions.reload-configuration.subtitle')).to.have.length(1)
      })

      test('should fetch data on mount', () => {
        const fetchDataSpy = sinon.spy()

        testingLibrary.renderWithIntl(
          <Configuration fetchData={fetchDataSpy} intl={IntlStub} postData={() => {}} isLoading={false} />
        )

        expect(fetchDataSpy).to.have.been.calledOnce
      })

      test('should reload selected data', async () => {
        const postDataSpy = sinon.spy()
        const fetchData = () => {}

        testingLibrary.renderWithIntl(
          <Configuration
            data={[
              {
                name: 'menu',
                id: 'menu'
              },
              {
                name: 'acl',
                id: 'acl'
              }
            ]}
            postData={postDataSpy}
            fetchData={fetchData}
            intl={IntlStub}
            isLoading={false}
          />
        )

        const checkboxes = await screen.getAllByRole('checkbox')
        // select menu
        fireEvent.click(checkboxes[0])
        fireEvent.click(checkboxes[1])
        fireEvent.click(checkboxes[1])

        // reload
        fireEvent.click(screen.getByText('client.actions.reload-configuration.reload.chosen'))
        expect(postDataSpy).to.have.been.calledWith(['menu'])
      })
    })
  })
})
