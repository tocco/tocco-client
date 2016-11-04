import {shallow, mount} from 'enzyme'
import {IntlStub} from 'tocco-test-util'
import React from 'react'
import {IntlProvider} from 'react-intl'
import MergeStrategy from './MergeStrategy'

describe('merge', () => {
  describe('components', () => {
    describe('MergeStrategy', () => {
      it('should load stategy with input fields', () => {
        const editOptions = [
          {
            "defaultValue": "archive",
            "label": "Status Person",
            "name": "relUser_status",
            "type": "set-relation-source-entity-strategy",
            "values": {
              "active": "Aktiv",
              "archive": "Archiv",
              "check": "Prüfen"
            },
            value: 'archive'

          }
        ]

        const strategies = {copyRelations: true, sourceEntityAction: 'NO_ACTION'}
        const wrapper = mount(
          <IntlProvider
            locale={'en-US'}
            messages={{
              'client.entityoperation.action.merge.yes': ' ',
              'client.entityoperation.action.merge.no': ' ',
              'client.entityoperation.action.merge.copyRelationsTitle': ' ',
              'client.entityoperation.action.merge.editTitle': ' ',
              'client.entityoperation.action.merge.strategyTitle': ' '
            }}
          >
            <MergeStrategy
              intl={IntlStub}
              editOptions={editOptions}
              strategies={strategies}
              changeEditOptionValue={()=> {
              }}
              activateEditOption={()=> {
              }}
              changeStrategy={()=> {
              }}
            />
          </IntlProvider>
        )

        expect(wrapper.find('select')).to.have.length(2)
        expect(wrapper.find('input[type="radio"]')).to.have.length(2)

      })

    })
  })
})
