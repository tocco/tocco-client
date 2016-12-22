import React from 'react'
import {EntityBrowser} from './EntityBrowser'
import * as ToccoUI from 'tocco-ui'

import {mount, shallow} from 'enzyme'

const EMPTY_FUNC = () => {}

describe('entity-browser', () => {
  describe('components', () => {
    describe('EntityBrowser', () => {
      it('should render', () => {
        const initializeTable = sinon.spy()

        const wrapper = mount(<EntityBrowser
          initializeTable={initializeTable}
          changePage={EMPTY_FUNC}
          setSearchTerm={EMPTY_FUNC}
          records={[]}
          searchFormDefinition={[]}
          orderBy={{}}
        />)

        expect(wrapper.find(EntityBrowser)).to.have.length(1)
        expect(wrapper.find(ToccoUI.Table)).to.have.length(1)
        expect(wrapper.find(ToccoUI.Pagination)).to.have.length(1)
        expect(initializeTable).to.have.calledOnce
      })

      it('should call changePage', () => {
        const changePage = sinon.spy()

        const wrapper = shallow(<EntityBrowser
          initializeTable={EMPTY_FUNC}
          changePage={changePage}
          setSearchTerm={EMPTY_FUNC}
          records={[]}
          searchFormDefinition={[]}
          orderBy={{}}
        />)

        wrapper.find(ToccoUI.Pagination).simulate('pageChange')
        expect(changePage).to.have.calledOnce
      })

      it('should pass properties to the ToccoUI.Table component', () => {
        const records = ['my', 'records']
        const orderBy = {
          name: 'name',
          direction: 'asc'
        }
        const columnDefinitions = ['my', 'column', 'definition']
        const recordRequestInProgress = true
        const orderByChange = sinon.spy()

        const wrapper = shallow(<EntityBrowser
          initializeTable={EMPTY_FUNC}
          changePage={EMPTY_FUNC}
          setSearchTerm={EMPTY_FUNC}
          records={records}
          searchFormDefinition={[]}
          orderBy={orderBy}
          columnDefinitions={columnDefinitions}
          recordRequestInProgress={recordRequestInProgress}
          setOrderBy={orderByChange}
        />)

        expect(wrapper.find(ToccoUI.Table).props().records).to.eql(records)
        expect(wrapper.find(ToccoUI.Table).props().orderBy).to.eql(orderBy)
        expect(wrapper.find(ToccoUI.Table).props().columnDefinitions).to.eql(columnDefinitions)
        expect(wrapper.find(ToccoUI.Table).props().loading).to.eql(recordRequestInProgress)
        wrapper.find(ToccoUI.Table).simulate('orderByChange')
        expect(orderByChange).to.have.calledOnce
      })

      it('should handle currentPage', () => {
        const currentPage = 100

        const wrapper = shallow(<EntityBrowser
          initializeTable={EMPTY_FUNC}
          changePage={EMPTY_FUNC}
          setOrderBy={EMPTY_FUNC}
          setSearchTerm={EMPTY_FUNC}
          records={[]}
          searchFormDefinition={[]}
          orderBy={{}}
          currentPage={currentPage}
        />)

        expect(wrapper.find(ToccoUI.Pagination).props().currentPage).to.eql(currentPage)
      })

      it('should handle limit', () => {
        const limit = 100

        const wrapper = shallow(<EntityBrowser
          initializeTable={EMPTY_FUNC}
          changePage={EMPTY_FUNC}
          setOrderBy={EMPTY_FUNC}
          setSearchTerm={EMPTY_FUNC}
          records={[]}
          searchFormDefinition={[]}
          orderBy={{}}
          limit={limit}
        />)

        expect(wrapper.find(ToccoUI.Pagination).props().recordsPerPage).to.eql(limit)
      })

      it('should handle recordCount', () => {
        const recordCount = 1234

        const wrapper = shallow(<EntityBrowser
          initializeTable={EMPTY_FUNC}
          changePage={EMPTY_FUNC}
          setOrderBy={EMPTY_FUNC}
          setSearchTerm={EMPTY_FUNC}
          records={[]}
          searchFormDefinition={[]}
          orderBy={{}}
          recordCount={recordCount}
        />)

        expect(wrapper.find(ToccoUI.Pagination).props().totalRecords).to.eql(recordCount)
      })

      it('should call refresh', () => {
        const spy = sinon.spy()

        const wrapper = shallow(<EntityBrowser
          initializeTable={EMPTY_FUNC}
          changePage={EMPTY_FUNC}
          setSearchTerm={EMPTY_FUNC}
          refresh={spy}
          records={[]}
          searchFormDefinition={[]}
          orderBy={{}}
        />)

        wrapper.find('.refresh-button').simulate('click')
        expect(spy).to.have.calledOnce
      })
    })
  })
})
