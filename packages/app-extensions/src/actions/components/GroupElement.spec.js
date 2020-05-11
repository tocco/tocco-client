import React from 'react'
import {Button, Menu} from 'tocco-ui'
import {IntlStub} from 'tocco-test-util'
import {shallow} from 'enzyme'

import {GroupElement} from './GroupElement'

const EMPTY_FUNC = () => {}

describe('app-extensions', () => {
  describe('actions', () => {
    describe('components', () => {
      describe('GroupElement', () => {
        test('should call onClick if not readonly', () => {
          const definition = {
            componentType: 'action',
            readonly: false
          }
          const clickSpy = sinon.spy()
          const selectSpy = sinon.spy()
          const wrapper = shallow(
            <GroupElement definition={definition} onSelect={selectSpy} onClick={clickSpy} intl={IntlStub}/>
          )
          wrapper.find(Button).simulate('click')
          expect(clickSpy).to.have.property('callCount', 1)
        })

        test('should not call onClick if readonly is false ', () => {
          const definition = {
            componentType: 'action',
            readonly: true
          }
          const clickSpy = sinon.spy()
          const selectSpy = sinon.spy()
          const wrapper = shallow(
            <GroupElement definition={definition} onSelect={selectSpy} onClick={clickSpy} intl={IntlStub}/>
          )
          wrapper.find(Button).simulate('click')
          expect(clickSpy).to.have.property('callCount', 0)
        })

        test('should display dividers', () => {
          const definition = {
            actionType: 'divider'
          }
          const wrapper = shallow(<GroupElement definition={definition} onClick={EMPTY_FUNC} intl={IntlStub}/>)
          expect(wrapper.find('hr')).to.have.length(1)
        })

        test('should render nested action-group in flyout menu', () => {
          const definition = {
            componentType: 'action-group',
            children: [{
              definition: {
                componentType: 'action'
              }
            }, {
              definition: {
                componentType: 'action'
              }
            }]
          }

          const wrapper = shallow(<GroupElement definition={definition} onClick={EMPTY_FUNC} intl={IntlStub}/>)
          const flyout = wrapper.find(Menu.ItemFlyout)
          expect(flyout).to.have.length(1)
          const stack = flyout.find(Menu.Stack)
          expect(stack).to.have.length(1)
          expect(stack.find(GroupElement)).to.have.length(2)
        })
      })
    })
  })
})
