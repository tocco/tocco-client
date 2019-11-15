import React from 'react'
import {intlEnzyme, IntlStub} from 'tocco-test-util'
import {FormattedValue} from 'tocco-ui'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import formattedValueFactory, {MultiSeparator} from './formattedValueFactory'

describe('entity-list', () => {
  describe('util', () => {
    const getStore = () => createStore(() => ({
      formData: {linkFactory: {}},
      list: {formDefinition: {id: 'User_list'}}
    }))

    describe('formattedValueFactory', () => {
      test('should return FormattedValue', () => {
        const field = {
          id: 'firstname-field', // does not match path by intention (-> should use path to get data)
          path: 'firstname',
          dataType: 'string'
        }
        const entity = {
          firstname: {
            value: 'Donald',
            type: 'string'
          }
        }

        const wrapper = intlEnzyme.mountWithIntl(
          <Provider store={getStore()}>
            {formattedValueFactory(field, entity, IntlStub)}
          </Provider>
        )
        expect(wrapper.find(FormattedValue)).to.have.length(1)
        expect(wrapper.find(FormattedValue).props().options).to.be.null
      })

      test('should return FormattedValue and add type specific props', () => {
        const field = {
          id: 'doc',
          path: 'doc',
          dataType: 'document'
        }
        const entity = {
          doc: {fileName: 'test.pdf', binaryLink: '...', thumbnailLink: '...'}
        }

        const wrapper = intlEnzyme.mountWithIntl(
          <Provider store={getStore()}>
            {formattedValueFactory(field, entity, IntlStub)}
          </Provider>
        )

        expect(wrapper.find(FormattedValue).props()).to.have.property('options')
        expect(wrapper.find(FormattedValue).props().options).to.not.be.null
      })

      test('should return array with separator', () => {
        const field = {
          id: 'relSomething.xy',
          path: 'relSomething.xy',
          dataType: 'string'
        }
        const entity = {
          'relSomething.xy': [{value: 'V1', type: 'string'}, {value: 'V1', type: 'string'}]
        }

        const wrapper = intlEnzyme.mountWithIntl(
          <Provider store={getStore()}>
            {formattedValueFactory(field, entity, IntlStub)}
          </Provider>
        )

        expect(wrapper.find(FormattedValue)).to.have.length(2)
        expect(wrapper.find(MultiSeparator)).to.have.length(1)
      })
    })
  })
})
