import {screen} from '@testing-library/react'
import {testingLibrary} from 'tocco-test-util'

import DetailFooter from './DetailFooter'

describe('entity-detail', () => {
  describe('components', () => {
    describe('DetailFooter', () => {
      test('should display the reduced footer for entities without nice fields', () => {
        const mode = 'update'
        const entityModel = {
          useNiceFields: false,
          keyField: 'pk'
        }
        const entity = {
          paths: {
            pk: {
              value: 1
            }
          }
        }

        testingLibrary.renderWithIntl(<DetailFooter mode={mode} entity={entity} entityModel={entityModel} />)

        expect(screen.queryByText('client.entity-detail.footer.key:')).to.exist

        expect(screen.queryByText('client.entity-detail.footer.created:')).to.not.exist
        expect(screen.queryByText('client.entity-detail.footer.updated:')).to.not.exist
        expect(screen.queryByText('client.entity-detail.footer.version:')).to.not.exist
        expect(screen.queryByText('client.entity-detail.footer.by:')).to.not.exist
      })

      test('should display the full footer for entities with nice fields', () => {
        const mode = 'update'
        const entityModel = {
          useNiceFields: true,
          keyField: 'pk'
        }
        const entity = {
          paths: {
            pk: {
              value: 1
            },
            create_timestamp: {
              value: '2018-05-03T11:32:19.015Z'
            },
            create_user: {
              value: ''
            },
            update_timestamp: {
              value: '2018-05-03T11:32:19.015Z'
            },
            update_user: {
              value: ''
            },
            version: {
              value: 3
            }
          }
        }

        testingLibrary.renderWithIntl(<DetailFooter mode={mode} entity={entity} entityModel={entityModel} />)

        expect(screen.queryByText('client.entity-detail.footer.created:')).to.exist
        expect(screen.queryAllByText('client.entity-detail.footer.by:')).to.have.length(2)
        expect(screen.queryByText('client.entity-detail.footer.updated:')).to.exist
        expect(screen.queryByText('client.entity-detail.footer.version:')).to.exist
        expect(screen.queryByText('client.entity-detail.footer.key:')).to.exist
      })

      test('should not display the footer for `create` mode', () => {
        const mode = 'create'
        const entityModel = {
          useNiceFields: true,
          keyField: 'pk'
        }
        const entity = {
          paths: {
            pk: {
              value: 1
            },
            create_timestamp: {
              value: '2018-05-03T11:32:19.015Z'
            },
            create_user: {
              value: ''
            },
            update_timestamp: {
              value: '2018-05-03T11:32:19.015Z'
            },
            update_user: {
              value: ''
            },
            version: {
              value: 3
            }
          }
        }

        testingLibrary.renderWithIntl(<DetailFooter mode={mode} entity={entity} entityModel={entityModel} />)

        expect(screen.queryByText('client.entity-detail.footer.key:')).to.not.exist
        expect(screen.queryByText('client.entity-detail.footer.created:')).to.not.exist
        expect(screen.queryByText('client.entity-detail.footer.updated:')).to.not.exist
        expect(screen.queryByText('client.entity-detail.footer.version:')).to.not.exist
        expect(screen.queryByText('client.entity-detail.footer.by:')).to.not.exist
      })

      test('should handle different key field', () => {
        const mode = 'update'
        const entityModel = {
          useNiceFields: false,
          keyField: 'id'
        }
        const entity = {
          paths: {
            id: {
              value: 123654
            }
          }
        }

        testingLibrary.renderWithIntl(<DetailFooter mode={mode} entity={entity} entityModel={entityModel} />)

        expect(screen.queryByText('client.entity-detail.footer.key:')).to.exist
        expect(screen.queryByText('123654')).to.exist
      })
    })
  })
})
