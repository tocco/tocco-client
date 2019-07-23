import {shallow} from 'enzyme'
import React from 'react'
import {intlEnzyme} from 'tocco-test-util'

import Action from './Action'
import ActionGroup from './ActionGroup'

const EMPTY_FUNC = () => {}

describe('app-extensions', () => {
  describe('actions', () => {
    describe('components', () => {
      const baseProps = {onClick: EMPTY_FUNC, selection: {entityName: 'User', type: 'ID', ids: []}}
      describe('Action', () => {
        test('should return null for if mode does not fit scopes', () => {
          const definition = {
            componentType: 'action',
            actionType: 'simple',
            id: 'test'
          }

          expect(
            shallow(<Action {...baseProps} definition={{...definition, scopes: ['update']}} mode="update"/>
            ).type()).not.to.be.null
          expect(
            shallow(<Action {...baseProps} definition={{...definition, scopes: ['update']}} mode="create'"/>
            ).type()).be.null
          expect(shallow(<Action {...baseProps} definition={{...definition}}/>).type()).not.to.be.null
          expect(shallow(
            <Action {...baseProps} definition={{...definition, scopes: ['update']}}/>)
            .type()).not.to.be.null
          expect(shallow(<Action {...baseProps} definition={{...definition}} mode="update"/>).type()).not.to.be.null
        })

        test('should return groups', () => {
          const definition = {
            componentType: 'action-group',
            label: 'test',
            children: [
              {
                componentType: 'action',
                actionType: 'SIMPLE'
              }
            ]
          }

          const wrapper = intlEnzyme.mountWithIntl(<Action {...baseProps} definition={definition}/>)
          expect(wrapper.find(ActionGroup)).to.have.length(1)
        })

        test('should return groups with main action', () => {
          const definition = {
            componentType: 'action-group',
            action: {
              componentType: 'action',
              actionType: 'simple'
            },
            children: [
              {
                componentType: 'action',
                actionType: 'simple'
              }
            ]
          }

          const wrapper = intlEnzyme.mountWithIntl(<Action {...baseProps} definition={definition}/>)
          expect(wrapper.find(ActionGroup)).to.have.length(1)
        })
      })
    })
  })
})
