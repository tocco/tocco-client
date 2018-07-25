import React from 'react'
import SubGrid from './SubGrid'
import {shallow} from 'enzyme'
import EntityListApp from 'tocco-entity-list/src/main'

describe('entity-detail', () => {
  describe('components', () => {
    describe('SubGrid', () => {
      const testProps = {
        detailFormName: 'User',
        gridName: 'relFoo',
        modelField: {targetEntity: 'Foo'},
        relationName: 'relFoo',
        onNavigateToCreate: () => {},
        showSubGridsCreateButton: false,
        dispatchEmittedAction: () => {},
        entityName: 'User'
      }

      it('should render', () => {
        const wrapper = shallow(<SubGrid {...testProps} />)
        expect(wrapper.find(EntityListApp)).to.have.length(1)
      })

      it('should render with default limit 5', () => {
        const wrapper = shallow(<SubGrid {...testProps} />)

        const listApp = wrapper.find(EntityListApp)
        expect(listApp.props().limit).to.equal(5)
      })

      it('should render with custom limit', () => {
        const wrapper = shallow(<SubGrid {...testProps} limit={10} />)

        const listApp = wrapper.find(EntityListApp)
        expect(listApp.props().limit).to.equal(10)
      })
    })
  })
})
