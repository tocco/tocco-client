import React from 'react'
import {Button} from 'tocco-ui'
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
            componentType: 'action-group',
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
            componentType: 'action-group',
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
            componentType: 'action-group',
            actionType: 'divider'
          }
          const wrapper = shallow(<GroupElement definition={definition} onClick={EMPTY_FUNC} intl={IntlStub}/>)
          expect(wrapper.find('hr')).to.have.length(1)
        })
      })
    })
  })
})
