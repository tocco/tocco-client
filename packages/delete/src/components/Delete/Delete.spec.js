import React from 'react'
import {intlStub, intlEnzyme} from 'tocco-test-util'
import {LoadMask} from 'tocco-ui'

import Delete from './Delete'
import Dialog from '../Dialog'

const dialogInfo = {
  entityModel: 'User',
  entityName: 'Person',
  deletable: ['100'],
  notDeletable: ['9', '1'],
  deletableRelated: {
    Resource: {
      entityName: 'Dokument',
      pks: ['17719', '33'],
      pksOtherBu: []
    },
    Output_job_item: {
      entityName: 'Einzeldokumente',
      pks: ['10303'],
      pksOtherBu: []
    }
  },
  notDeletableRelated: {
    Resource: {
      entityName: 'Dokument',
      pks: ['44', '20000'],
      pksOtherBu: ['583']
    },
    Order: {
      entityName: 'Auftrag',
      pks: ['1023'],
      pksOtherBu: []
    }
  },
  unreadableEntities: true
}

describe('delete', () => {
  describe('components', () => {
    describe('Delete', () => {
      it('should render', () => {
        const loadSpy = sinon.spy()
        const wrapper = intlEnzyme.shallowWithIntl(
          <Delete intl={intlStub} dialogInfo={dialogInfo} loadDialogInfo={loadSpy}/>
        )
        expect(wrapper.find(LoadMask)).to.have.length(1)
      })

      it('should render Dialog if dialogInfo is set', () => {
        const wrapper = intlEnzyme.shallowWithIntl(
          <Delete intl={intlStub} dialogInfo={dialogInfo} loadDialogInfo={() => {}}/>
        )
        expect(wrapper.find(Dialog)).to.have.length(1)
      })
    })
  })
})
