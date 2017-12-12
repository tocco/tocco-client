import {shallow} from 'enzyme'
import React from 'react'
import GroupElement from './GroupElement'
import {MenuItem} from 'react-bootstrap'

const EMPTY_FUNC = () => {}

describe('tocco-util', () => {
  describe('actions', () => {
    describe('components', () => {
      describe('GroupElement', () => {
        it('should call onClick if readOnly', () => {
          const definition = {
            type: 'ch.tocco.nice2.model.form.components.action.ActionGroup',
            readOnly: false
          }
          const clickSpy = sinon.spy()
          const selectSpy = sinon.spy()

          const wrapper = shallow(<GroupElement definition={definition} onSelect={selectSpy} onClick={clickSpy}/>)

          wrapper.find(MenuItem).simulate('click')

          expect(clickSpy).to.have.property('callCount', 1)
        })

        it('should not call onClick if readOnly ', () => {
          const definition = {
            type: 'ch.tocco.nice2.model.form.components.action.ActionGroup',
            readOnly: true
          }
          const clickSpy = sinon.spy()
          const selectSpy = sinon.spy()

          const wrapper = shallow(<GroupElement definition={definition} onSelect={selectSpy} onClick={clickSpy}/>)

          wrapper.find(MenuItem).simulate('click')
          expect(clickSpy).to.have.property('callCount', 0)
        })

        it('should not call onClick if readOnly ', () => {
          const definition = {
            type: 'ch.tocco.nice2.model.form.components.action.GroupDivider'
          }

          const wrapper = shallow(<GroupElement definition={definition} onClick={EMPTY_FUNC}/>)
          expect(wrapper.find(MenuItem).props().divider).to.be.true
        })
      })
    })
  })
})
