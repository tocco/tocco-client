import {mount} from 'enzyme'
import {IntlStub} from 'tocco-test-util'
import React from 'react'
import {IntlProvider} from 'react-intl'

import MergeStrategy from './MergeStrategy'

describe('merge', () => {
  describe('components', () => {
    describe('MergeStrategy', () => {
      test('should load strategy with input fields', () => {
        const editOptions = [
          {
            defaultValue: 'archive',
            label: 'Status Person',
            name: 'relUser_status',
            type: 'set-relation-source-entity-strategy',
            values: {
              active: 'Aktiv',
              archive: 'Archiv',
              check: 'Prüfen'
            },
            value: 'archive'
          }
        ]

        const strategies = {copyRelations: true, sourceEntityAction: 'NO_ACTION'}
        const emptyFnc = () => {
        }
        const wrapper = mount(
          <IntlProvider
            locale={'en-US'}
            messages={{
              'client.merge.yes': ' ',
              'client.merge.no': ' ',
              'client.merge.copyRelationsTitle': ' ',
              'client.merge.editTitle': ' ',
              'client.merge.strategyTitle': ' '
            }}
          >
            <MergeStrategy
              intl={IntlStub}
              editOptions={editOptions}
              strategies={strategies}
              changeEditOptionValue={emptyFnc}
              activateEditOption={emptyFnc}
              changeStrategy={emptyFnc}
            />
          </IntlProvider>
        )
        expect(wrapper.find('button')).to.have.length(2)
        expect(wrapper.find('select')).to.have.length(1)
      })
    })
  })
})
