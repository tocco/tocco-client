import {shallow, mount} from 'enzyme'
import React from 'react'
import Action from './Action'
import ActionGroup from './ActionGroup'

const EMPTY_FUNC = () => {}

describe('tocco-util', () => {
  describe('actions', () => {
    describe('components', () => {
      describe('Action', () => {
        it('should return null for old actions', () => {
          const definition = {
            type: 'ch.tocco.nice2.model.form.components.action.Action'
          }

          const wrapper = shallow(<Action definition={definition} onClick={EMPTY_FUNC}/>)

          expect(wrapper.type()).to.be.null
        })

        it('should return null for if mode does not fit scopes', () => {
          const definition = {
            type: 'ch.tocco.nice2.model.form.components.action.SimpleAction'
          }
          const props = {onClick: EMPTY_FUNC}
          expect(
            shallow(<Action {...props} definition={{...definition, scopes: ['update']}} mode="update"/>
            ).type()).not.to.be.null
          expect(
            shallow(<Action {...props} definition={{...definition, scopes: ['update']}} mode="create'"/>
            ).type()).be.null
          expect(shallow(<Action {...props} definition={{...definition}}/>).type()).not.to.be.null
          expect(shallow(<Action {...props} definition={{...definition, scopes: ['update']}}/>).type()).not.to.be.null
          expect(shallow(<Action {...props} definition={{...definition}} mode="update"/>).type()).not.to.be.null
        })

        it('should return groups', () => {
          const definition = {
            type: 'ch.tocco.nice2.model.form.components.action.ActionGroup',
            label: 'test',
            children: [
              {
                type: 'ch.tocco.nice2.model.form.components.action.SimpleAction'
              }
            ]
          }

          const wrapper = mount(<Action onClick={EMPTY_FUNC} definition={definition}/>)
          expect(wrapper.find(ActionGroup)).to.have.length(1)
        })

        it('should return groups with main action', () => {
          const definition = {
            type: 'ch.tocco.nice2.model.form.components.action.ActionGroup',
            action: {
              type: 'ch.tocco.nice2.model.form.components.action.SimpleAction'
            },
            children: [
              {
                type: 'ch.tocco.nice2.model.form.components.action.SimpleAction'
              }
            ]
          }

          const wrapper = mount(<Action onClick={EMPTY_FUNC} definition={definition}/>)
          expect(wrapper.find(ActionGroup)).to.have.length(1)
        })
      })
    })
  })
})
