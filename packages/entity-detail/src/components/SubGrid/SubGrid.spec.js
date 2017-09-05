import React from 'react'
import SubGrid from './SubGrid'
import {shallow} from 'enzyme'
import EntityListApp from 'tocco-entity-list/src/main'

describe('entity-detail', () => {
  describe('components', () => {
    describe('SubGrid', () => {
      it('should render', () => {
        const wrapper = shallow(
          <SubGrid
            detailFormName="User"
            gridName="relFoo"
            modelField={{targetEntity: 'Foo'}}
            relationName="relFoo"
            onNavigateToCreate={() => {}}
          />
        )

        expect(wrapper.find(EntityListApp)).to.have.length(1)
      })
    })
  })
})
