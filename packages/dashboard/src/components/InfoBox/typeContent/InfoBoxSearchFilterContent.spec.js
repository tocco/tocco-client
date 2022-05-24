import React from 'react'
import {shallow} from 'enzyme'
import EntityListApp from 'tocco-entity-list/src/main'

import InfoBoxSearchFilterContent from './InfoBoxSearchFilterContent'

describe('dashboard', () => {
  describe('components', () => {
    describe('InfoBox', () => {
      describe('typeContent', () => {
        describe('InfoBoxSearchFilterContent', () => {
          test('should render entity-list content', () => {
            const content = {
              searchFilterUniqueId: 'birthdays',
              entityName: 'User',
              scope: 'infobox',
              limit: 25,
              orderBy: 'field'
            }
            const wrapper = shallow(
                <InfoBoxSearchFilterContent id="infobox" content={content}/>
            )

            expect(wrapper.find(EntityListApp).prop('searchFilters')).to.deep.equal([content.searchFilterUniqueId])
            expect(wrapper.find(EntityListApp).prop('scope')).to.deep.equal(content.scope)
            expect(wrapper.find(EntityListApp).prop('entityName')).to.deep.equal(content.entityName)
            expect(wrapper.find(EntityListApp).prop('formName')).to.deep.equal(content.entityName)
            expect(wrapper.find(EntityListApp).prop('limit')).to.deep.equal(content.limit)
            expect(wrapper.find(EntityListApp).prop('sorting')).to.deep.equal([{field: 'field', order: 'asc'}])
          })

          test('should handle desc order', () => {
            const content = {
              orderBy: 'field desc'
            }

            const wrapper = shallow(
                <InfoBoxSearchFilterContent id="infobox" content={content}/>
            )

            expect(wrapper.find(EntityListApp).prop('sorting')).to.deep.equal([{field: 'field', order: 'desc'}])
          })

          test('should handle multiple sortings', () => {
            const content = {
              orderBy: 'field desc, other asc'
            }

            const wrapper = shallow(
                <InfoBoxSearchFilterContent id="infobox" content={content}/>
            )

            expect(wrapper.find(EntityListApp).prop('sorting')).to.deep.equal([
              {field: 'field', order: 'desc'},
              {field: 'other', order: 'asc'}
            ])
          })
        })
      })
    })
  })
})
