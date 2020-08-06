import React from 'react'
import {mount} from 'enzyme'

import {Icon} from '../'
import SortingState from './SortingState'

describe('tocco-ui', () => {
  describe('Table', () => {
    describe('SortingState', () => {
      test('should render arrow up', () => {
        const wrapper = mount(
          <SortingState column={{id: 'firstname', sorting: {sortRank: 1, order: 'asc'}}}/>
        )
        expect(wrapper.find(Icon)).to.have.prop('icon', 'sort-up')
      })

      test('should render arrow down', () => {
        const wrapper = mount(<SortingState column={{id: 'firstname', sorting: {sortRank: 1, order: 'desc'}}}/>)
        expect(wrapper.find(Icon)).to.have.prop('icon', 'sort-down')
      })

      test('should render nothing if no sorting set', () => {
        const wrapper = mount(<SortingState column={{id: 'firstname'}}/>)
        expect(wrapper).to.be.empty
      })

      test('should render sup if second sorting is set', () => {
        const wrapper = mount(<SortingState column={{id: 'firstname', sorting: {sortRank: 2, order: 'desc'}}}/>)
        expect(wrapper.find(Icon).prop('icon')).to.eql('sort-down')
        expect(wrapper.html()).contains('<span>2</span>')
      })

      test('should render sup if third sorting is set', () => {
        const wrapper = mount(<SortingState column={{id: 'firstname', sorting: {sortRank: 3, order: 'asc'}}}/>)
        expect(wrapper.find(Icon).prop('icon')).to.eql('sort-up')
        expect(wrapper.html()).contains('<span>3</span>')
      })
    })
  })
})
