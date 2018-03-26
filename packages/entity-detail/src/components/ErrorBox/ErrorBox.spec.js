import React from 'react'
import ErrorBox from './ErrorBox'
import {shallow} from 'enzyme'

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
        const wrapper = shallow(<ErrorBox
          formErrors={formErrors}
          showErrors={EMPTY_FUNC}
        />)

        expect(wrapper.find('.alert')).to.have.length(1)
        expect(wrapper.find('li')).to.have.length(3)
      })

      it('should show field', () => {
        const formErrors = {_error: {}, firstname: {mandatory: ['mandatory!']}}
        const wrapper = shallow(<ErrorBox
          formErrors={formErrors}
          showErrors={EMPTY_FUNC}
        />)

        expect(wrapper.find('.alert')).to.have.length(1)
        expect(wrapper.find('a')).to.have.length(1)
        expect(wrapper.find('li')).to.have.length(1)
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

        const wrapper = shallow(<ErrorBox
          formErrors={formErrors}
          showErrors={EMPTY_FUNC}
        />)

        expect(wrapper.find('.alert')).to.have.length(1)
        expect(wrapper.find('li')).to.have.length(4)
      })
    })
  })
})
