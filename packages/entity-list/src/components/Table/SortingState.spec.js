import React from 'react'
import {mount} from 'enzyme'
import {Icon} from 'tocco-ui'

import SortingState from './SortingState'

describe('entity-list', () => {
  describe('components', () => {
    describe('Table', () => {
      describe('SortingState', () => {
        test('should render arrow up', () => {
          const sorting = [{field: 'firstname', order: 'asc'}]
          const wrapper = mount(<SortingState column={{id: 'firstname'}} sorting={sorting}/>)
          expect(wrapper.find(Icon)).to.have.prop('icon', 'sort-up')
        })

        test('should render arrow down', () => {
          const sorting = [{field: 'firstname', order: 'desc'}]
          const wrapper = mount(<SortingState column={{id: 'firstname'}} sorting={sorting}/>)
          expect(wrapper.find(Icon)).to.have.prop('icon', 'sort-down')
        })

        test('should render nothing if no sorting set', () => {
          const sorting = [{field: 'lastname', order: 'desc'}]
          const wrapper = mount(<SortingState column={{id: 'firstname'}} sorting={sorting}/>)
          expect(wrapper).to.be.empty
        })

        test('should render sup if second sorting is set', () => {
          const sorting = [{field: 'lastname', order: 'desc'}, {field: 'firstname', order: 'desc'}]
          const wrapper = mount(<SortingState column={{id: 'firstname'}} sorting={sorting}/>)
          expect(wrapper.find('sup')).to.have.length(1)
          expect(wrapper.find('sup')).to.have.html('<sup class="down">2</sup>')
        })

        test('should render sup if second sorting is set', () => {
          const sorting = [{}, {}, {field: 'firstname', order: 'asc'}]
          const wrapper = mount(<SortingState column={{id: 'firstname'}} sorting={sorting}/>)
          expect(wrapper.find('sup')).to.have.length(1)
          expect(wrapper.find('sup')).to.have.html('<sup class="up">3</sup>')
        })
      })
    })
  })
})
