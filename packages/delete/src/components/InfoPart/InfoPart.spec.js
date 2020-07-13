import React from 'react'
import {mount} from 'enzyme'
import {RouterLink} from 'tocco-ui'
import {MemoryRouter} from 'react-router-dom'

import InfoPart from './InfoPart'

describe('delete', () => {
  describe('components', () => {
    describe('InfoPart', () => {
      it('should information and Links', () => {
        const wrapper = mount(
          <MemoryRouter>
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
                Address: {
                  entityLabel: 'Adresse',
                  keys: [],
                  keysOtherBu: ['23']
                }
              }}
              maxCountLink={100}
            />
          </MemoryRouter>
        )

        expect(wrapper.text()).to.eql('Person (2) / Dokument (2), Adresse (1)')
        expect(wrapper.find(RouterLink)).to.have.length(2)
      })
    })
  })
})
