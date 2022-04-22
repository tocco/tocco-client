import {mount} from 'enzyme'
import {IntlProvider} from 'react-intl'

import {Icon} from '../'
import SortingState from './SortingState'

describe('tocco-ui', () => {
  describe('Table', () => {
    describe('SortingState', () => {
      test('should render arrow up', () => {
        const wrapper = mount(
          <IntlProvider locale="de">
            <SortingState column={{id: 'firstname', sorting: {sortRank: 1, order: 'asc'}}} />
          </IntlProvider>
        )
        expect(wrapper.find(Icon)).to.have.prop('icon', 'sort-up')
      })

      test('should render arrow down', () => {
        const wrapper = mount(
          <IntlProvider locale="de">
            <SortingState column={{id: 'firstname', sorting: {sortRank: 1, order: 'desc'}}} />
          </IntlProvider>
        )
        expect(wrapper.find(Icon)).to.have.prop('icon', 'sort-down')
      })

      test('should render nothing if no sorting set', () => {
        const wrapper = mount(
          <IntlProvider locale="de">
            <SortingState column={{id: 'firstname'}} />
          </IntlProvider>
        )
        expect(wrapper.find(Icon)).to.have.length(0)
      })

      test('should render sup if second sorting is set', () => {
        const wrapper = mount(
          <IntlProvider locale="de">
            <SortingState column={{id: 'firstname', sorting: {sortRank: 2, order: 'desc'}}} />
          </IntlProvider>
        )
        expect(wrapper.find(Icon).prop('icon')).to.eql('sort-down')
        expect(wrapper.html()).to.be.contains('2')
      })

      test('should render sup if third sorting is set', () => {
        const wrapper = mount(
          <IntlProvider locale="de">
            <SortingState column={{id: 'firstname', sorting: {sortRank: 3, order: 'asc'}}} />
          </IntlProvider>
        )
        expect(wrapper.find(Icon).prop('icon')).to.eql('sort-up')
        expect(wrapper.html()).to.be.contains('3')
      })
    })
  })
})
