import React from 'react'
import {mount} from 'enzyme'
import {Link} from 'tocco-ui'

import InfoPart from './InfoPart'

describe('delete', () => {
  describe('components', () => {
    describe('Dialog', () => {
      it('should information and Links', () => {
        const wrapper = mount(
          <InfoPart
            entityName="Person"
            entityModel="User"
            primaryPks={['1', '3']}
            relatedEntities={{
              Document: {
                entityName: 'Dokument',
                pks: ['103'],
                pksOtherBu: ['23']
              },
              Addresse: {
                entityName: 'Adresse',
                pks: [],
                pksOtherBu: ['23']
              }
            }}
            maxCountLink={100}
          />)

        expect(wrapper.text()).to.eql('Person (2) / Dokument (2), Adresse (1)')
        expect(wrapper.find(Link)).to.have.length(2)
      })
    })
  })
})
