import React from 'react'
import {mount} from 'enzyme'
import {Link} from 'tocco-ui'

import InfoPart from './InfoPart'

describe('delete', () => {
  describe('components', () => {
    describe('InfoPart', () => {
      it('should information and Links', () => {
        const wrapper = mount(
          <InfoPart
            entityName="User"
            entityLabel="Person"
            keys={['1', '3']}
            relatedEntities={{
              Document: {
                entityLabel: 'Dokument',
                keys: ['103'],
                keysOtherBu: ['23']
              },
              Addresse: {
                entityLabel: 'Adresse',
                keys: [],
                keysOtherBu: ['23']
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
