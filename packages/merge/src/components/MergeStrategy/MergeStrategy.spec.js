import {shallow, mount} from 'enzyme'

import React from 'react'
import MergeStrategy from './MergeStrategy'
import {mountWithIntlProvider} from 'tocco-test-util/intl-enzyme'

import {
  IntlProvider,
  FormattedRelative,
} from 'react-intl';

describe('merge', () => {
  describe('MergeStrategy Component', () => {
    describe('', () => {
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
            }
          }
        ]

        const strategies = {copyRelations: true, sourceEntityAction: 'NO_ACTION'}
        const wrapper = mountWithIntlProvider(
          <MergeStrategy editOptions={editOptions} strategies={strategies}/>
        )

        expect(wrapper.find('select')).to.have.length(2)
        expect(wrapper.find('input[type="radio"]')).to.have.length(2)

      })

    })
  })
})
