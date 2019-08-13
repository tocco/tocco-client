import React from 'react'
import {IntlStub, intlEnzyme} from 'tocco-test-util'
import {shallow} from 'enzyme'
import {FormattedValue} from 'tocco-ui'
import {actions} from 'tocco-app-extensions'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import cellRenderer from './cellRenderer'

describe('entity-list', () => {
  describe('util', () => {
    const getStore = () => createStore(() => ({formData: {}}))
    describe('cellRenderer', () => {
      test('should return a formattedValue for componentType field', () => {
        const field = {
          componentType: 'field',
          id: 'firstname-field', // does not match path by intention (-> should use path to get data)
          path: 'firstname'
        }
        const entity = {
          firstname: {
            value: 'Donald',
            type: 'string'
          }
        }
        const parent = {}

        const wrapper = intlEnzyme.mountWithIntl(
          <Provider store={getStore()}>
            {cellRenderer(field, entity, parent, {}, IntlStub)}
          </Provider>)

        expect(wrapper.find(FormattedValue)).to.have.length(1)
      })

      test('should return an html formattedValue for DisplayExpressions', () => {
        const field = {
          componentType: 'display',
          id: 'myDisplayExpression'
        }
        const entity = {
          myDisplayExpression: '<h1>test</h1>'
        }
        const parent = {}

        const wrapper = shallow(cellRenderer(field, entity, parent, {}, IntlStub))
        expect(wrapper.find(FormattedValue)).to.have.length(1)
        expect(wrapper.find(FormattedValue)).to.have.prop('type', 'html')
      })

      test('should return an action for componentType action', () => {
        const field = {
          componentType: 'action',
          id: 'myAction'
        }
        const entity = {__model: 'User', __key: '123'}
        const parent = {}
        const store = createStore(() => {})
        const wrapper = shallow(<Provider store={store}>{cellRenderer(field, entity, parent, {}, IntlStub)}</Provider>)
        expect(wrapper.find(actions.Action)).to.have.length(1)
      })
    })
  })
})
