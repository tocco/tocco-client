import React from 'react'
import EntityList from './EntityList'
import ListViewContainer from '../../containers/ListViewContainer'
import SearchFormContainer from '../../containers/SearchFormContainer'
import {shallow} from 'enzyme'
import {IntlStub} from 'tocco-test-util'

const EMPTY_FUNC = () => {}

describe('entity-list', () => {
  describe('components', () => {
    describe('EntityList', () => {
      it('should render ListView', () => {
        const wrapper = shallow(<EntityList intl={IntlStub} initialize={EMPTY_FUNC} navigateToCreate={EMPTY_FUNC}/>)
        expect(wrapper.find(ListViewContainer)).to.have.length(1)
      })

      it('should call inizialize', () => {
        const initSpy = sinon.spy()
        shallow(<EntityList intl={IntlStub} initialize={initSpy} navigateToCreate={EMPTY_FUNC}/>)
        expect(initSpy).to.have.calledOnce
      })

      it('should show searchForm depending on prop', () => {
        const wrapper = shallow(
          <EntityList
            intl={IntlStub}
            initialize={EMPTY_FUNC}
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
