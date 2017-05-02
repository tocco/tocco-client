import React from 'react'
import SubGrid from './SubGrid'
import {mount} from 'enzyme'
import {context} from 'tocco-test-util'
import EntityListApp from 'entity-list'

describe('entity-browser', () => {
  describe('components', () => {
    describe('SubGrid', () => {
      it('should render', () => {
        const fakeContext = {router: {listen: () => {}}}
        const contextTypes = {router: React.PropTypes.object}

        const tableDefinition = {
          type: 'ch.tocco.nice2.model.form.components.table.Table',
          children: []
        }

        const subGridComponent = context.wrapWithContext(fakeContext, contextTypes,
          <SubGrid tableDefinition={tableDefinition} modelField={{targetEntity:'User'}} relationName="relFoo"/>
        )

        const wrapper = mount(subGridComponent)

        expect(wrapper.find(EntityListApp)).to.have.length(1)
      })
    })
  })
})
