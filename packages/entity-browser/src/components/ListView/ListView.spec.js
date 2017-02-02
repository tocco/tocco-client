import React from 'react'
import {IntlStub} from 'tocco-test-util'
import ListView from './ListView'
import {Pagination, Table} from 'tocco-ui'

import {mount, shallow} from 'enzyme'

const EMPTY_FUNC = () => {}

describe('entity-browser', () => {
  describe('components', () => {
    describe('ListView', () => {
      it('should render', () => {
        const wrapper = mount(<ListView
          changePage={EMPTY_FUNC}
          setSearchTerm={EMPTY_FUNC}
          entities={[]}
          searchFormDefinition={[]}
          orderBy={{}}
          intl={IntlStub}
        />)

        expect(wrapper.find(ListView)).to.have.length(1)
        expect(wrapper.find(Table)).to.have.length(1)
        expect(wrapper.find(Pagination)).to.have.length(1)
      })

      it('should call changePage', () => {
        const changePage = sinon.spy()

        const wrapper = shallow(<ListView
          initializeTable={EMPTY_FUNC}
          changePage={changePage}
          setSearchTerm={EMPTY_FUNC}
          entities={[]}
          searchFormDefinition={[]}
          orderBy={{}}
          intl={IntlStub}
        />)

        wrapper.find(Pagination).simulate('pageChange')
        expect(changePage).to.have.calledOnce
      })

      it('should pass properties to the Table component', () => {
        const entities = ['my', 'entities']
        const orderBy = {
          name: 'name',
          direction: 'asc'
        }
        const columnDefinitions = ['my', 'column', 'definition']
        const inProgress = true
        const orderByChange = sinon.spy()

        const wrapper = shallow(<ListView
          initializeTable={EMPTY_FUNC}
          changePage={EMPTY_FUNC}
          setSearchTerm={EMPTY_FUNC}
          entities={entities}
          searchFormDefinition={[]}
          orderBy={orderBy}
          columnDefinitions={columnDefinitions}
          inProgress={inProgress}
          setOrderBy={orderByChange}
          intl={IntlStub}
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
          initializeTable={EMPTY_FUNC}
          changePage={EMPTY_FUNC}
          setOrderBy={EMPTY_FUNC}
          setSearchTerm={EMPTY_FUNC}
          entities={[]}
          searchFormDefinition={[]}
          orderBy={{}}
          currentPage={currentPage}
          intl={IntlStub}
        />)

        expect(wrapper.find(Pagination).props().currentPage).to.eql(currentPage)
      })

      it('should handle limit', () => {
        const limit = 100

        const wrapper = shallow(<ListView
          initializeTable={EMPTY_FUNC}
          changePage={EMPTY_FUNC}
          setOrderBy={EMPTY_FUNC}
          setSearchTerm={EMPTY_FUNC}
          entities={[]}
          searchFormDefinition={[]}
          orderBy={{}}
          limit={limit}
          intl={IntlStub}
        />)

        expect(wrapper.find(Pagination).props().recordsPerPage).to.eql(limit)
      })

      it('should handle entityCount', () => {
        const entityCount = 1234

        const wrapper = shallow(<ListView
          initializeTable={EMPTY_FUNC}
          changePage={EMPTY_FUNC}
          setOrderBy={EMPTY_FUNC}
          setSearchTerm={EMPTY_FUNC}
          entities={[]}
          searchFormDefinition={[]}
          orderBy={{}}
          entityCount={entityCount}
          intl={IntlStub}
        />)

        expect(wrapper.find(Pagination).props().totalRecords).to.eql(entityCount)
      })

      it('should call refresh', () => {
        const spy = sinon.spy()

        const wrapper = shallow(<ListView
          initializeTable={EMPTY_FUNC}
          changePage={EMPTY_FUNC}
          setSearchTerm={EMPTY_FUNC}
          refresh={spy}
          entities={[]}
          searchFormDefinition={[]}
          orderBy={{}}
          intl={IntlStub}
        />)

        wrapper.find('.refresh-button').simulate('click')
        expect(spy).to.have.calledOnce
      })
    })
  })
})
