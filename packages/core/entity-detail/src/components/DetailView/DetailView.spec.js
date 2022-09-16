import {screen} from '@testing-library/react'
import {IntlStub, testingLibrary} from 'tocco-test-util'

import DetailView from './DetailView'

jest.mock('../../containers/DetailFormContainer', () => () => <div data-testid="detail-form" />)

const EMPTY_FUNC = () => {}

describe('entity-detail', () => {
  describe('components', () => {
    describe('DetailView', () => {
      test('should render loading indicator while form is initializing', () => {
        const routerProp = {
          match: {
            params: {
              entityId: 1
            }
          }
        }

        testingLibrary.renderWithIntl(
          <DetailView
            intl={IntlStub}
            router={routerProp}
            closeEntityDetail={EMPTY_FUNC}
            entityModel={{}}
            fieldDefinitions={[]}
            entityName="User"
            entityId="21"
            modelPaths={[]}
            unloadDetailView={EMPTY_FUNC}
            loadRemoteEntity={EMPTY_FUNC}
            remoteEntities={{}}
            saveEntity={EMPTY_FUNC}
            submitForm={EMPTY_FUNC}
            logError={EMPTY_FUNC}
            formDefinition={{}}
          />
        )
        expect(screen.getByText('client.entity-detail.loadingText')).to.exist
      })

      test('should render detail form', () => {
        const routerProp = {
          match: {
            params: {
              entityId: 1
            }
          }
        }

        testingLibrary.renderWithIntl(
          <DetailView
            intl={IntlStub}
            router={routerProp}
            closeEntityDetail={EMPTY_FUNC}
            entityModel={{}}
            fieldDefinitions={[]}
            entityName="User"
            entityId="21"
            modelPaths={[]}
            unloadDetailView={EMPTY_FUNC}
            loadRemoteEntity={EMPTY_FUNC}
            remoteEntities={{}}
            saveEntity={EMPTY_FUNC}
            submitForm={EMPTY_FUNC}
            logError={EMPTY_FUNC}
            formInitialValues={{}}
            formDefinition={{}}
          />
        )
        expect(screen.getByTestId('detail-form')).to.exist
      })
    })
  })
})
