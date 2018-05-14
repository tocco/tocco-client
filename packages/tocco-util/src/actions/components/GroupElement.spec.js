import {shallow} from 'enzyme'
import React from 'react'

import {Button} from 'tocco-ui'
import GroupElement from './GroupElement'

const EMPTY_FUNC = () => {}

describe('tocco-util', () => {
  describe('actions', () => {
    describe('components', () => {
      describe('GroupElement', () => {
        it('should call onClick if not readonly', () => {
          const definition = {
            componentType: 'action-group',
            readonly: false
          }
          const clickSpy = sinon.spy()
          const selectSpy = sinon.spy()
          const wrapper = shallow(<GroupElement definition={definition} onSelect={selectSpy} onClick={clickSpy}/>)
          wrapper.find(Button).simulate('click')
          expect(clickSpy).to.have.property('callCount', 1)
        })

        it('should not call onClick if readonly is false ', () => {
          const definition = {
            componentType: 'action-group',
            readonly: true
          }
          const clickSpy = sinon.spy()
          const selectSpy = sinon.spy()
          const wrapper = shallow(<GroupElement definition={definition} onSelect={selectSpy} onClick={clickSpy}/>)
          wrapper.find(Button).simulate('click')
          expect(clickSpy).to.have.property('callCount', 0)
        })

        it('should display dividers', () => {
          const definition = {
            componentType: 'action-group',
            actionType: 'divider'
          }
          const wrapper = shallow(<GroupElement definition={definition} onClick={EMPTY_FUNC}/>)
          expect(wrapper.find('hr')).to.have.length(1)
        })
      })
    })
  })
})
