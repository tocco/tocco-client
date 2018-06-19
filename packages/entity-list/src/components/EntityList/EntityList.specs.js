import React from 'react'
import EntityList from './EntityList'
import ListViewContainer from '../../containers/ListViewContainer'
import SearchFormContainer from '../../containers/SearchFormContainer'
import {shallow} from 'enzyme'

const EMPTY_FUNC = () => {}

describe('entity-list', () => {
  describe('components', () => {
    describe('EntityList', () => {
      it('should render ListView', () => {
        const wrapper = shallow(
          <EntityList initialize={EMPTY_FUNC} initializeSearchForm={EMPTY_FUNC} navigateToCreate={EMPTY_FUNC}/>
        )
        expect(wrapper.find(ListViewContainer)).to.have.length(1)
      })

      it('should call inizialize', () => {
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

      it('should show searchForm depending on prop', () => {
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
    })
  })
})
