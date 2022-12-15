import {screen} from '@testing-library/react'
import {IntlProvider} from 'react-intl'
import {testingLibrary} from 'tocco-test-util'

import ErrorItems from './ErrorItems'

const EMPTY_FUNC = () => {}

const messages = {
  'client.entity-detail.outdatedErrorTitle': 'test',
  'client.entity-detail.outdatedErrorDescription': 'test',
  'client.entity-detail.validatorErrors': 'test',
  'client.entity-detail.invalidFieldsError': 'test',
  'client.entity-detail.invalidRelationErrors': 'test'
}

describe('entity-detail', () => {
  describe('components', () => {
    describe('ErrorItems', () => {
      test('should render relation errors', () => {
        const formErrors = {
          _error: {
            relatedEntityErrors: [
              {
                model: 'User_status',
                key: '3',
                paths: {
                  label_de: {
                    mandatory: ['Pflichtfeld ist nicht ausgefüllt.']
                  }
                }
              },
              {
                model: 'User_status2',
                key: '4',
                paths: {
                  label_de: {
                    mandatory: ['Pflichtfeld ist nicht ausgefüllt.']
                  }
                }
              }
            ]
          }
        }

        testingLibrary.renderWithIntl(
          <IntlProvider locale="en" messages={messages}>
            <ErrorItems formErrors={{...formErrors}} showErrors={EMPTY_FUNC} />
          </IntlProvider>
        )

        expect(screen.queryByText(messages['client.entity-detail.invalidRelationErrors'])).to.exist
        expect(screen.queryByText('Pflichtfeld ist nicht ausgefüllt. (label_de, User_status, 3)')).to.exist
        expect(screen.queryByText('Pflichtfeld ist nicht ausgefüllt. (label_de, User_status2, 4)')).to.exist
      })

      test('should show field', () => {
        const formErrors = {_error: {}, firstname: {mandatory: ['mandatory!']}}
        testingLibrary.renderWithIntl(
          <IntlProvider locale="en" messages={messages}>
            <ErrorItems formErrors={{...formErrors}} showErrors={EMPTY_FUNC} />
          </IntlProvider>
        )

        expect(screen.queryByText(messages['client.entity-detail.invalidFieldsError'])).to.exist
      })

      test('should show entityValidatorErrors', () => {
        const formErrors = {
          _error: {
            entityValidatorErrors: {
              UsernameAsciiValidator: ['AsciiValidatorError'],
              OtherId: ['OtherId1', 'OtherId2']
            }
          }
        }

        testingLibrary.renderWithIntl(
          <IntlProvider locale="en" messages={messages}>
            <ErrorItems formErrors={{...formErrors}} showErrors={EMPTY_FUNC} />
          </IntlProvider>
        )

        expect(screen.queryByText(messages['client.entity-detail.validatorErrors'])).to.exist
        expect(screen.queryByText('AsciiValidatorError')).to.exist
        expect(screen.queryByText('OtherId1')).to.exist
        expect(screen.queryByText('OtherId2')).to.exist
      })

      test('should show outdated error', () => {
        const formErrors = {
          _error: {
            outdatedError: {
              model: 'User',
              sameEntity: true,
              updateTimestamp: '2021-07-27T14:15:18.220Z',
              updateUser: 'user3'
            }
          }
        }

        testingLibrary.renderWithIntl(
          <IntlProvider locale="en" messages={messages}>
            <ErrorItems formErrors={{...formErrors}} showErrors={EMPTY_FUNC} />
          </IntlProvider>
        )

        expect(screen.queryAllByText(messages['client.entity-detail.outdatedErrorTitle'])).to.have.length(2)
      })
    })
  })
})
