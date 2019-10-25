import React from 'react'
import {shallow} from 'enzyme'

import SearchView from './SearchView'
import FullTextSearchForm from '../../containers/FullTextSearchFormContainer'
import BasicSearchFormContainer from '../../containers/BasicSearchFormContainer'
import AdminSearchForm from '../AdminSearchForm'
import searchFormTypes from '../../util/searchFormTypes'

const EMPTY_FUNC = () => {}

describe('entity-list', () => {
  describe('components', () => {
    describe('SearchView', () => {
      test('should show search form depending on type', () => {
        const wrapper = shallow(
          <SearchView
            initializeSearchForm={EMPTY_FUNC}
            searchFormType={searchFormTypes.SIMPLE}
          />
        )
        expect(wrapper.find(FullTextSearchForm)).to.have.length(1)
        wrapper.setProps({searchFormType: searchFormTypes.BASIC})
        expect(wrapper.find(BasicSearchFormContainer)).to.have.length(1)
        wrapper.setProps({searchFormType: searchFormTypes.ADMIN})
        expect(wrapper.find(AdminSearchForm)).to.have.length(1)
      })
    })
  })
})
