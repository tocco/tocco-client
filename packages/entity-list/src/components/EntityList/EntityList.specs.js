import React from 'react'
import {shallow} from 'enzyme'

import EntityList from './EntityList'
import ListViewContainer from '../../containers/ListViewContainer'
import SearchFormContainer from '../../containers/SearchFormContainer'
import FullTextSearchFormContainer from '../../containers/FullTextSearchFormContainer'

const EMPTY_FUNC = () => {}

describe('entity-list', () => {
  describe('components', () => {
    describe('EntityList', () => {
      test('should render ListView', () => {
        const wrapper = shallow(
          <EntityList initialize={EMPTY_FUNC} initializeSearchForm={EMPTY_FUNC} navigateToCreate={EMPTY_FUNC}/>
        )
        expect(wrapper.find(ListViewContainer)).to.have.length(1)
      })

      test('should call inizialize', () => {
        const initSpy = sinon.spy()
        const initSearchFormSpy = sinon.spy()
        const showSearchForm = false
        shallow(
          <EntityList
            initialize={initSpy}
            initializeSearchForm={initSearchFormSpy}
            showSearchForm={showSearchForm}
            navigateToCreate={EMPTY_FUNC}/>
        )
        expect(initSpy).to.have.calledOnce
        expect(initSearchFormSpy).to.have.calledWith(showSearchForm)
      })

      test('should show searchForm depending on prop', () => {
        const wrapper = shallow(
          <EntityList
            initialize={EMPTY_FUNC}
            initializeSearchForm={EMPTY_FUNC}
            navigateToCreate={EMPTY_FUNC}
            showSearchForm={false}
          />
        )
        expect(wrapper.find(SearchFormContainer)).to.have.length(0)
        wrapper.setProps({showSearchForm: true})
        expect(wrapper.find(SearchFormContainer)).to.have.length(1)
      })

      test('should show full text searchForm depending on prop', () => {
        const wrapper = shallow(
          <EntityList
            initialize={EMPTY_FUNC}
            initializeSearchForm={EMPTY_FUNC}
            navigateToCreate={EMPTY_FUNC}
            showSearchForm={true}
            showFullTextSearchForm={true}
          />
        )
        expect(wrapper.find(FullTextSearchFormContainer)).to.have.length(1)
      })
    })
  })
})
