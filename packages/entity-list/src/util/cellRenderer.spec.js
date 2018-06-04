import React from 'react'
import {IntlStub} from 'tocco-test-util'
import cellRenderer from './cellRenderer'
import {shallow} from 'enzyme'
import {FormattedValue} from 'tocco-ui'
import {actions} from 'tocco-util'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

describe('entity-list', () => {
  describe('util', () => {
    describe('cellRenderer', () => {
      it('should return a formattedValue for componentType field', () => {
        const field = {
          componentType: 'field',
          id: 'firstname'
        }
        const entity = {
          firstname: {
            value: 'Donald',
            type: 'string'
          }
        }

        const wrapper = shallow(cellRenderer(field, entity, {}, IntlStub))
        expect(wrapper.find(FormattedValue)).to.have.length(1)
      })

      it('should return an html formattedValue for DisplayExpressions', () => {
        const field = {
          componentType: 'display',
          id: 'myDisplayExpression'
        }
        const entity = {
          myDisplayExpression: '<h1>test</h1>'
        }

        const wrapper = shallow(cellRenderer(field, entity, {}, IntlStub))
        expect(wrapper.find(FormattedValue)).to.have.length(1)
        expect(wrapper.find(FormattedValue)).to.have.prop('type', 'html')
      })

      it('should return an action for componentType action', () => {
        const field = {
          componentType: 'action',
          id: 'myAction'
        }
        const entity = {__model: 'User', __key: '123'}
        const store = createStore(() => {})
        const wrapper = shallow(<Provider store={store}>{cellRenderer(field, entity, {}, IntlStub)}</Provider>)
        expect(wrapper.find(actions.Action)).to.have.length(1)
      })
    })
  })
})
