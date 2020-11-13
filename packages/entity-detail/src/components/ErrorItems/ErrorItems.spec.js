import React from 'react'
import {mount} from 'enzyme'
import {IntlProvider} from 'react-intl'
import {SignalList} from 'tocco-ui'

import ErrorItems from './ErrorItems'

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
        const signalListItem = wrapper.find(SignalList.Item)

        expect(wrapper.find('span').text()).to.equal('client.entity-detail.invalidRelationErrors')
        expect(signalListItem.get(1).props.label).to.be
          .equal('Pflichtfeld ist nicht ausgefüllt. (label_de, User_status, 3)')
        expect(signalListItem.get(2).props.label).to.be
          .equal('Pflichtfeld ist nicht ausgefüllt. (label_de, User_status2, 4)')
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

        expect(wrapper.find('span').first().text()).to.equal('client.entity-detail.invalidFieldsError')
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
        const signalListItem = wrapper.find(SignalList.Item)

        expect(wrapper.find('span').text()).to.equal('client.entity-detail.validatorErrors')
        expect(signalListItem.get(1).props.label).to.be.equal('1')
        expect(signalListItem.get(2).props.label).to.be.equal('2')
        expect(signalListItem.get(3).props.label).to.be.equal('3')
      })
    })
  })
})
