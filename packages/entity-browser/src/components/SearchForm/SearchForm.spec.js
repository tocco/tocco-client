import React from 'react'
import {IntlStub} from 'tocco-test-util'
import SearchField from './SearchField'
import SearchForm from './'
import {mount} from 'enzyme'

const EMPTY_FUNC = () => {}

describe('entity-browser', () => {
  describe('components', () => {
    describe('SearchForm', () => {
      it('should render needed components', () => {
        const entityModel = require('../../dev/test-data/userModel.json')
        const searchFormDefinition = require('../../dev/test-data/searchFormDefinition.json')

        const wrapper = mount(<SearchForm
          entityModel={entityModel}
          searchFormDefinition={searchFormDefinition}
          setSearchInput={EMPTY_FUNC}
          relationEntities={{}}
          searchInputs={{}}
          reset={EMPTY_FUNC}
          intl={IntlStub}
        />)

        expect(wrapper.find(SearchField)).to.have.length(searchFormDefinition.length)
      })
    })
  })
})
