import React from 'react'
import ListView from './ListView'
import {Pagination, Table} from 'tocco-ui'
import SearchFormContainer from '../../containers/SearchFormContainer'
import {IntlStub} from 'tocco-test-util'
import {shallow} from 'enzyme'

const EMPTY_FUNC = () => {}

const defaultProps = {
  entityCount: 1,
  initialize: EMPTY_FUNC,
  limit: 10,
  columnDefinitions: [],
  searchFormDefinition: [],
  changePage: EMPTY_FUNC,
  setSearchTerm: EMPTY_FUNC,
  entities: [],
  intl: IntlStub,
  orderBy: null,
  showSearchForm: true
}

describe('entity-browser', () => {
  describe('components', () => {
    describe('ListView', () => {
      it('should render', () => {
        const wrapper = shallow(<ListView {...defaultProps}/>)

        expect(wrapper.find(SearchFormContainer)).to.have.length(1)
        expect(wrapper.find(Table)).to.have.length(1)
        expect(wrapper.find(Pagination)).to.have.length(1)
      })

      it('should call changePage', () => {
        const changePage = sinon.spy()

        const wrapper = shallow(<ListView
          {...defaultProps}
          changePage={changePage}
        />)

        wrapper.find(Pagination).simulate('pageChange')
        expect(changePage).to.have.calledOnce
      })

      it('should pass properties to the Table component', () => {
        const entities = [{id: 1, values:{}}, {id: 2, values:{}}]
        const orderBy = {
          name: 'name',
          direction: 'asc'
        }
        const columnDefinitions = [{value: 'my'}]
        const inProgress = true
        const orderByChange = sinon.spy()

        const wrapper = shallow(<ListView
          {...defaultProps}
          entities={entities}
          orderBy={orderBy}
          columnDefinitions={columnDefinitions}
          inProgress={inProgress}
          setOrderBy={orderByChange}
        />)

        expect(wrapper.find(Table).props().records).to.eql(entities)
        expect(wrapper.find(Table).props().orderBy).to.eql(orderBy)
        expect(wrapper.find(Table).props().columnDefinitions).to.eql(columnDefinitions)
        expect(wrapper.find(Table).props().loading).to.eql(inProgress)
        wrapper.find(Table).simulate('orderByChange')
        expect(orderByChange).to.have.calledOnce
      })

      it('should handle currentPage', () => {
        const currentPage = 100

        const wrapper = shallow(<ListView
          {...defaultProps}
          currentPage={currentPage}
        />)

        expect(wrapper.find(Pagination).props().currentPage).to.eql(currentPage)
      })

      it('should handle limit', () => {
        const limit = 100

        const wrapper = shallow(<ListView
          {...defaultProps}
          limit={limit}
        />)

        expect(wrapper.find(Pagination).props().recordsPerPage).to.eql(limit)
      })

      it('should handle entityCount', () => {
        const entityCount = 1234

        const wrapper = shallow(<ListView
          {...defaultProps}
          entityCount={entityCount}
        />)

        expect(wrapper.find(Pagination).props().totalRecords).to.eql(entityCount)
      })

      it('should call refresh', () => {
        const spy = sinon.spy()

        const wrapper = shallow(<ListView
          {...defaultProps}
          refresh={spy}
        />)

        wrapper.find('.refresh-button').simulate('click')
        expect(spy).to.have.calledOnce
      })
    })
  })
})
