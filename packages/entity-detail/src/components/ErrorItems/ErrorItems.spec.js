import React from 'react'
import {mount} from 'enzyme'
import {IntlProvider} from 'react-intl'

import ErrorItems, {ErrorItem} from './ErrorItems'

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
            relatedEntityErrors: [{
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
            }]
          }
        }

        const wrapper = mount(
          <IntlProvider locale="en" messages={messages}>
            <ErrorItems
              formErrors={{...formErrors}}
              showErrors={EMPTY_FUNC}
            />
          </IntlProvider>
        )

        expect(wrapper.find('FormattedMessage').text()).to.equal(messages['client.entity-detail.invalidRelationErrors'])
        expect(wrapper.find(ErrorItem).at(0).text()).to.eql(
          'Pflichtfeld ist nicht ausgefüllt. (label_de, User_status, 3)'
        )
        expect(wrapper.find(ErrorItem).at(1).text()).to.eql(
          'Pflichtfeld ist nicht ausgefüllt. (label_de, User_status2, 4)'
        )
      })

      test('should show field', () => {
        const formErrors = {_error: {}, firstname: {mandatory: ['mandatory!']}}
        const wrapper = mount(
          <IntlProvider locale="en" messages={messages}>
            <ErrorItems
              formErrors={{...formErrors}}
              showErrors={EMPTY_FUNC}
            />
          </IntlProvider>
        )

        expect(wrapper.find('FormattedMessage').first().text())
          .to.equal(messages['client.entity-detail.invalidFieldsError'])
      })

      test('should show entityValidatorErrors', () => {
        const formErrors = {
          _error: {
            entityValidatorErrors: {
              UsernameAsciiValidator: ['1'],
              OtherId: ['2', '3']
            }
          }
        }

        const wrapper = mount(
          <IntlProvider locale="en" messages={messages}>
            <ErrorItems
              formErrors={{...formErrors}}
              showErrors={EMPTY_FUNC}
            />
          </IntlProvider>
        )
        expect(wrapper.find('FormattedMessage').text()).to.equal(messages['client.entity-detail.validatorErrors'])
        expect(wrapper.find(ErrorItem)).to.have.length(3)
        expect(wrapper.find(ErrorItem).at(0).text()).to.eql('1')
        expect(wrapper.find(ErrorItem).at(1).text()).to.eql('2')
        expect(wrapper.find(ErrorItem).at(2).text()).to.eql('3')
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

        const wrapper = mount(
          <IntlProvider locale="en" messages={messages}>
            <ErrorItems
              formErrors={{...formErrors}}
              showErrors={EMPTY_FUNC}
            />
          </IntlProvider>
        )

        expect(wrapper.find('FormattedMessage').at(0).text())
          .to.equal(messages['client.entity-detail.outdatedErrorTitle'])
        expect(wrapper.find('FormattedMessage').at(1).text())
          .to.equal(messages['client.entity-detail.outdatedErrorTitle'])
      })
    })
  })
})
