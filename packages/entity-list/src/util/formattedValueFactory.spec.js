import {IntlStub} from 'tocco-test-util'
import {FormattedValue} from 'tocco-ui'
import {shallow} from 'enzyme'

import formattedValueFactory from './formattedValueFactory'

describe('entity-list', () => {
  describe('util', () => {
    describe('formattedValueFactory', () => {
      it('should return FormattedValue', () => {
        const field = {
          id: 'firstname'
        }
        const entity = {
          firstname: {
            value: 'Donald',
            type: 'string'
          }
        }

        const wrapper = shallow(formattedValueFactory(field, entity, IntlStub))
        expect(wrapper.find(FormattedValue)).to.have.length(1)
        expect(wrapper.find(FormattedValue).props()).to.not.have.property('options')
      })

      it('should return FormattedValue and add type specific props', () => {
        const field = {
          id: 'doc'
        }
        const entity = {
          doc: {
            value: {fileName: 'test.pdf', binaryLink: '', thumbnailLink: ''},
            type: 'document'
          }
        }

        const wrapper = shallow(formattedValueFactory(field, entity, IntlStub))
        expect(wrapper.find(FormattedValue).props()).to.have.property('options')
        expect(wrapper.find(FormattedValue).props()['options']).to.not.be.undefined
      })
    })
  })
})
