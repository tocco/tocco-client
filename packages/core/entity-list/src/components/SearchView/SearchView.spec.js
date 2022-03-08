import {shallow} from 'enzyme'
import React from 'react'

import BasicSearchFormContainer from '../../containers/BasicSearchFormContainer'
import FullTextSearchForm from '../../containers/FullTextSearchFormContainer'
import searchFormTypes from '../../util/searchFormTypes'
import AdminSearchForm from '../AdminSearchForm'
import SearchView from './SearchView'

const EMPTY_FUNC = () => {}

describe('entity-list', () => {
  describe('components', () => {
    describe('SearchView', () => {
      test('should show search form depending on type', () => {
        const wrapper = shallow(
          <SearchView initializeSearchForm={EMPTY_FUNC} searchFormType={searchFormTypes.FULLTEXT} />
        )
        expect(wrapper.find(FullTextSearchForm)).to.have.length(1)
        wrapper.setProps({searchFormType: searchFormTypes.SIMPLE_ADVANCED})
        expect(wrapper.find(BasicSearchFormContainer)).to.have.length(1)
        wrapper.setProps({searchFormType: searchFormTypes.ADMIN})
        expect(wrapper.find(AdminSearchForm)).to.have.length(1)
      })
    })
  })
})
