import React from 'react'
import {shallow} from 'enzyme'
import EntityListApp from 'tocco-entity-list/src/main'

import SubGrid from './SubGrid'

describe('entity-detail', () => {
  describe('components', () => {
    describe('SubGrid', () => {
      const testProps = {
        detailFormName: 'User',
        gridName: 'relFoo',
        modelField: {targetEntity: 'Foo'},
        relationName: 'relFoo',
        navigateToCreate: () => {},
        showSubGridsCreateButton: false,
        dispatchEmittedAction: () => {},
        entityName: 'User'
      }

      test('should render', () => {
        const wrapper = shallow(<SubGrid {...testProps} />)
        expect(wrapper.find(EntityListApp)).to.have.length(1)
      })

      test('should render with default limit 5', () => {
        const wrapper = shallow(<SubGrid {...testProps} />)

        const listApp = wrapper.find(EntityListApp)
        expect(listApp.props().limit).to.equal(5)
      })

      test('should render with custom limit', () => {
        const wrapper = shallow(<SubGrid {...testProps} limit={10} />)

        const listApp = wrapper.find(EntityListApp)
        expect(listApp.props().limit).to.equal(10)
      })
    })
  })
})
