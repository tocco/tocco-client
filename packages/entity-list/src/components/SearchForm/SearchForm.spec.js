import React from 'react'
import {MemoryRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

import {IntlStub, intlEnzyme} from 'tocco-test-util'
import {Button, FormField} from 'tocco-ui'

import SearchForm from './'

const EMPTY_FUNC = () => {}

describe('entity-list', () => {
  describe('components', () => {
    describe('SearchForm', () => {
      it('should render nothing if searchFormDefinition empty', () => {
        const entityModel = require('../../dev/test-data/userModel.json')
        const searchFormDefinition = {}

        const store = createStore(() => {
        })

        const wrapper = intlEnzyme.mountWithIntl(
          <Provider store={store}>
            <MemoryRouter>
              <SearchForm
                initializeSearchForm={EMPTY_FUNC}
                entityModel={entityModel}
                searchFormDefinition={searchFormDefinition}
                setSearchInput={EMPTY_FUNC}
                relationEntities={{}}
                searchInputs={{}}
                loadRelationEntity={EMPTY_FUNC}
                executeSearch={EMPTY_FUNC}
                resetSearch={EMPTY_FUNC}
                intl={IntlStub}
                simpleSearchFields={[]}
                disableSimpleSearch
                preselectedSearchFields={[]}
              />
            </MemoryRouter>
          </Provider>
        )

        expect(wrapper.find('form')).to.have.length(0)
      })

      it('should render needed components', () => {
        const entityModel = require('../../dev/test-data/userModel.json')
        const searchFormDefinition = require('../../dev/test-data/searchFormDefinition.json')

        const store = createStore(() => {
        })

        const wrapper = intlEnzyme.mountWithIntl(
          <Provider store={store}>
            <MemoryRouter>
              <SearchForm
                initializeSearchForm={EMPTY_FUNC}
                entityModel={entityModel}
                searchFormDefinition={searchFormDefinition}
                setSearchInput={EMPTY_FUNC}
                relationEntities={{}}
                searchInputs={{}}
                loadRelationEntity={EMPTY_FUNC}
                executeSearch={EMPTY_FUNC}
                resetSearch={EMPTY_FUNC}
                intl={IntlStub}
                simpleSearchFields={[]}
                disableSimpleSearch
                preselectedSearchFields={[]}
              />
            </MemoryRouter>
          </Provider>
        )

        expect(wrapper.find(FormField)).to.have.length(searchFormDefinition.children.length)
        expect(wrapper.find(Button)).to.have.length(2)
      })

      it('should render only the fulltext field', () => {
        const entityModel = require('../../dev/test-data/userModel.json')
        const searchFormDefinition = require('../../dev/test-data/searchFormDefinition.json')

        const store = createStore(() => {
        })

        const wrapper = intlEnzyme.mountWithIntl(
          <Provider store={store}>
            <MemoryRouter>
              <SearchForm
                initializeSearchForm={EMPTY_FUNC}
                entityModel={entityModel}
                searchFormDefinition={searchFormDefinition}
                setSearchInput={EMPTY_FUNC}
                relationEntities={{}}
                searchInputs={{}}
                loadRelationEntity={EMPTY_FUNC}
                executeSearch={EMPTY_FUNC}
                resetSearch={EMPTY_FUNC}
                intl={IntlStub}
                simpleSearchFields={['txtFulltext']}
                preselectedSearchFields={[]}
              />
            </MemoryRouter>
          </Provider>
        )

        expect(wrapper.find(FormField)).to.have.length(1)
        expect(wrapper.find(Button)).to.have.length(3)
      })

      it('should render two fields', () => {
        const entityModel = require('../../dev/test-data/userModel.json')
        const searchFormDefinition = require('../../dev/test-data/searchFormDefinition.json')

        const store = createStore(() => {
        })

        const wrapper = intlEnzyme.mountWithIntl(
          <Provider store={store}>
            <MemoryRouter>
              <SearchForm
                initializeSearchForm={EMPTY_FUNC}
                entityModel={entityModel}
                searchFormDefinition={searchFormDefinition}
                setSearchInput={EMPTY_FUNC}
                relationEntities={{}}
                searchInputs={{}}
                loadRelationEntity={EMPTY_FUNC}
                executeSearch={EMPTY_FUNC}
                resetSearch={EMPTY_FUNC}
                intl={IntlStub}
                simpleSearchFields={['txtFulltext', 'relUser_code1']}
                preselectedSearchFields={[]}
              />
            </MemoryRouter>
          </Provider>
        )

        expect(wrapper.find(FormField)).to.have.length(2)
        expect(wrapper.find(Button)).to.have.length(3)
      })

      it('should not show hidden value', () => {
        const entityModel = require('../../dev/test-data/userModel.json')
        const searchFormDefinition = require('../../dev/test-data/searchFormDefinition.json')

        const preselectedSearchFields = [
          {
            id: 'relUser_code1',
            hidden: true
          }
        ]

        const store = createStore(() => {
        })

        const wrapper = intlEnzyme.mountWithIntl(
          <Provider store={store}>
            <MemoryRouter>
              <SearchForm
                initializeSearchForm={EMPTY_FUNC}
                entityModel={entityModel}
                searchFormDefinition={searchFormDefinition}
                setSearchInput={EMPTY_FUNC}
                relationEntities={{}}
                searchInputs={{}}
                loadRelationEntity={EMPTY_FUNC}
                executeSearch={EMPTY_FUNC}
                resetSearch={EMPTY_FUNC}
                intl={IntlStub}
                disableSimpleSearch
                simpleSearchFields={[]}
                preselectedSearchFields={preselectedSearchFields}
              />
            </MemoryRouter>
          </Provider>
        )

        expect(wrapper.find(FormField)).to.have.length(searchFormDefinition.children.length - 1)
      })
    })
  })
})
