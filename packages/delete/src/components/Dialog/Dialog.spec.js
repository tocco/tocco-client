import React from 'react'
import {shallow} from 'enzyme'
import {Button, SignalBox} from 'tocco-ui'

import Dialog from './Dialog'
import InfoPart from './InfoPart'

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
    describe('Dialog', () => {
      it('should render Dialog if dialogInfo is set', () => {
        const wrapper = shallow(<Dialog doDelete={() => {}} onCancel={() => {}} dialogInfo={dialogInfo}/>)
        expect(wrapper.find(InfoPart)).to.have.length(2)
        expect(wrapper.find(SignalBox)).to.have.length(1)
        expect(wrapper.find(Button)).to.have.length(2)
      })
    })
  })
})
