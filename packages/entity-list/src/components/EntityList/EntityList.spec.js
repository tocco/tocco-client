import React from 'react'
import {shallow} from 'enzyme'

import EntityList from './EntityList'
import SearchFormContainer from '../../containers/SearchFormContainer'
import searchFormTypes from '../../util/searchFormTypes'

const EMPTY_FUNC = () => {}

describe('entity-list', () => {
  describe('components', () => {
    describe('EntityList', () => {
      test('should render ListView', () => {
        const wrapper = shallow(
          <EntityList initialize={EMPTY_FUNC}/>
        )

        expect(wrapper.find('List')).to.have.length(1)
      })

      test('should show searchForm depending on prop', () => {
        const wrapper = shallow(
          <EntityList
            initialize={EMPTY_FUNC}
            initializeSearchForm={EMPTY_FUNC}
            navigateToCreate={EMPTY_FUNC}
            searchFormType={searchFormTypes.NONE}
          />
        )
        expect(wrapper.find(SearchFormContainer)).to.have.length(0)
        wrapper.setProps({searchFormType: searchFormTypes.BASIC})
        expect(wrapper.find(SearchFormContainer)).to.have.length(1)
      })
    })
  })
})
