import React from 'react'
import {intlEnzyme} from 'tocco-test-util'

import Action from './Action'
import ActionGroup from './ActionGroup'
import {SingleAction} from './SingleAction'

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

          expect(intlEnzyme.mountWithIntl(
            <Action {...baseProps} definition={{...definition, scopes: ['update']}} mode="update"/>)
            .find(SingleAction)).to.have.length(1)

          expect(intlEnzyme.mountWithIntl(
            <Action {...baseProps} definition={{...definition, scopes: ['update']}} mode="create"/>
          ).find(SingleAction)).to.have.length(0)

          expect(intlEnzyme.mountWithIntl(
            <Action {...baseProps} definition={{...definition}}/>)
            .find(SingleAction)).to.have.length(1)

          expect(intlEnzyme.mountWithIntl(<Action {...baseProps} definition={{...definition, scopes: ['update']}}/>)
            .find(SingleAction)).to.have.length(1)

          expect(intlEnzyme.mountWithIntl(<Action {...baseProps} definition={{...definition}} mode="update"/>)
            .find(SingleAction)).to.have.length(1)
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

        test('should return an array of actions if wrapped inside an action-bar', () => {
          const definition = {
            componentType: 'action-bar',
            action: {
              componentType: 'action',
              actionType: 'simple'
            },
            children: [
              {
                componentType: 'action',
                actionType: 'simple'
              },
              {
                componentType: 'action',
                actionType: 'simple'
              },
              {
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
            ]
          }

          const wrapper = intlEnzyme.mountWithIntl(<Action {...baseProps} definition={definition}/>)
          expect(wrapper.find(SingleAction)).to.have.length(2)
          expect(wrapper.find(ActionGroup)).to.have.length(1)
        })
      })
    })
  })
})
