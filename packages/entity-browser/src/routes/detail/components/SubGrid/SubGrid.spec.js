import React from 'react'
import SubGrid from './SubGrid'
import {shallow} from 'enzyme'
import {context} from 'tocco-test-util'

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

        shallow(subGridComponent)
      })
    })
  })
})
