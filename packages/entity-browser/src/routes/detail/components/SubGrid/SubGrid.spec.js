import React from 'react'
import SubGrid from './SubGrid'
import {mount} from 'enzyme'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {MemoryRouter} from 'react-router-dom'
import EntityListApp from 'entity-list/src/main'

describe('entity-browser', () => {
  describe('components', () => {
    describe('SubGrid', () => {
      it('should render', () => {
        const tableDefinition = {
          type: 'ch.tocco.nice2.model.form.components.table.Table',
          children: []
        }

        const store = createStore(() => {})

        const wrapper = mount(
          <Provider store={store}>
            <MemoryRouter>
              <SubGrid
                tableDefinition={tableDefinition}
                modelField={{targetEntity: 'User'}}
                relationName="relFoo"
                gridName="FooGrid"
                detailFormName="FooForm"
              />
            </MemoryRouter>
          </Provider>)

        expect(wrapper.find(EntityListApp)).to.have.length(1)
      })
    })
  })
})
