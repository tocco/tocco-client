import React from 'react'
import {mount} from 'enzyme'
import {IntlProvider} from 'react-intl'

import ErrorItems, {ErrorItem} from './ErrorItems'

const EMPTY_FUNC = () => {}

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
          <IntlProvider locale="en">
            <ErrorItems
              formErrors={{...formErrors}}
              showErrors={EMPTY_FUNC}
            />
          </IntlProvider>
        )

        expect(wrapper.find('FormattedMessage').text()).to.equal('client.entity-detail.invalidRelationErrors')
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
          <IntlProvider locale="en">
            <ErrorItems
              formErrors={{...formErrors}}
              showErrors={EMPTY_FUNC}
            />
          </IntlProvider>
        )

        expect(wrapper.find('FormattedMessage').first().text()).to.equal('client.entity-detail.invalidFieldsError')
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
          <IntlProvider locale="en">
            <ErrorItems
              formErrors={{...formErrors}}
              showErrors={EMPTY_FUNC}
            />
          </IntlProvider>
        )
        expect(wrapper.find('FormattedMessage').text()).to.equal('client.entity-detail.validatorErrors')
        expect(wrapper.find(ErrorItem)).to.have.length(3)
        expect(wrapper.find(ErrorItem).at(0).text()).to.eql('1')
        expect(wrapper.find(ErrorItem).at(1).text()).to.eql('2')
        expect(wrapper.find(ErrorItem).at(2).text()).to.eql('3')
      })
    })
  })
})
