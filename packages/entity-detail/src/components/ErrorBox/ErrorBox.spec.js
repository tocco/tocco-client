import React from 'react'
import ErrorBox from './ErrorBox'
import {mount} from 'enzyme'
import {IntlProvider} from 'react-intl'

const EMPTY_FUNC = () => {}

describe('entity-detail', () => {
  describe('components', () => {
    describe('ErrorBox', () => {
      it('should render relation errors', () => {
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
            }]}}
        const wrapper = mount(
          <IntlProvider locale="en">
            <ErrorBox
              formErrors={{...formErrors}}
              showErrors={EMPTY_FUNC}
            />
          </IntlProvider>
        )

        expect(wrapper.find('.alert')).to.have.length(1)
        expect(wrapper.find('.relationEntityError')).to.have.length(2)
      })

      it('should show field', () => {
        const formErrors = {_error: {}, firstname: {mandatory: ['mandatory!']}}
        const wrapper = mount(
          <IntlProvider locale="en">
            <ErrorBox
              formErrors={{...formErrors}}
              showErrors={EMPTY_FUNC}
            />
          </IntlProvider>
        )

        expect(wrapper.find('.alert')).to.have.length(1)
        expect(wrapper.find('a')).to.have.length(1)
        expect(wrapper.find('.fieldError')).to.have.length(1)
      })

      it('should show field', () => {
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
            <ErrorBox
              formErrors={{...formErrors}}
              showErrors={EMPTY_FUNC}
            />
          </IntlProvider>
        )

        expect(wrapper.find('.alert')).to.have.length(1)
        expect(wrapper.find('.validationError')).to.have.length(3)
      })
    })
  })
})
