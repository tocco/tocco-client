import React from 'react'
import {IntlStub} from 'tocco-test-util'
import SearchField from './SearchField'
import SearchForm from './'
import {mount} from 'enzyme'
import {Button} from 'tocco-ui'

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
          simpleSearchFields={[]}
          disableSimpleSearch
        />)

        expect(wrapper.find(SearchField)).to.have.length(searchFormDefinition.length)
        expect(wrapper.find(Button)).to.have.length(2)
      })

      it('should render only the fulltext field', () => {
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
          disableSimpleSearch={false}
          simpleSearchFields={['txtFulltext']}
        />)

        expect(wrapper.find(SearchField)).to.have.length(1)
        expect(wrapper.find(Button)).to.have.length(3)
      })

      it('should render two fields', () => {
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
          disableSimpleSearch={false}
          simpleSearchFields={['txtFulltext', 'relUser_code1']}
        />)

        expect(wrapper.find(SearchField)).to.have.length(2)
        expect(wrapper.find(Button)).to.have.length(3)
      })
    })
  })
})
