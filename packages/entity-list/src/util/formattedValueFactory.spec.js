import React from 'react'
import {intlEnzyme, IntlStub} from 'tocco-test-util'
import {FormattedValue} from 'tocco-ui'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import formattedValueFactory, {MultiSeparator} from './formattedValueFactory'

describe('entity-list', () => {
  describe('util', () => {
    const getStore = () => createStore(() => ({formData: {}}))

    describe('formattedValueFactory', () => {
      test('should return FormattedValue', () => {
        const field = {
          id: 'firstname-field', // does not match path by intention (-> should use path to get data)
          path: 'firstname'
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
        expect(wrapper.find(FormattedValue).props()).to.not.have.property('options')
      })

      test('should return FormattedValue and add type specific props', () => {
        const field = {
          id: 'doc',
          path: 'doc'
        }
        const entity = {
          doc: {
            value: {fileName: 'test.pdf', binaryLink: '', thumbnailLink: ''},
            type: 'document'
          }
        }

        const wrapper = intlEnzyme.mountWithIntl(
          <Provider store={getStore()}>
            {formattedValueFactory(field, entity, IntlStub)}
          </Provider>
        )

        expect(wrapper.find(FormattedValue).props()).to.have.property('options')
        expect(wrapper.find(FormattedValue).props().options).to.not.be.undefined
      })

      test('should return array with separator', () => {
        const field = {
          id: 'relSomething.xy',
          path: 'relSomething.xy'
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

      test('should return null', () => {
        const field = {id: 'xy', path: 'xy'}
        const entity = {xy: []}

        expect(formattedValueFactory(field, entity, IntlStub)).to.be.null
      })
    })
  })
})
