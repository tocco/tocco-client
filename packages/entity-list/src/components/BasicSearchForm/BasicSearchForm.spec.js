import React from 'react'
import {MemoryRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {IntlStub, intlEnzyme, TestThemeProvider} from 'tocco-test-util'
import {Button, StatedValue} from 'tocco-ui'

import SearchForm from './'

const EMPTY_FUNC = () => {
}

describe('entity-list', () => {
  describe('components', () => {
    describe('BasicSearchForm', () => {
      test('should render nothing if searchFormDefinition empty', () => {
        const entityModel = require('../../dev/test-data/userModel.json')
        const searchFormDefinition = {}

        const store = createStore(() => ({
          form: {
            detailForm: {}
          }
        }))

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
                loadRelationEntities={EMPTY_FUNC}
                loadTooltip={EMPTY_FUNC}
                submitSearchForm={EMPTY_FUNC}
                resetSearch={EMPTY_FUNC}
                intl={IntlStub}
                simpleSearchFields={[]}
                disableSimpleSearch
                preselectedSearchFields={[]}
                setShowExtendedSearchForm={EMPTY_FUNC}
                loadSearchFilters={EMPTY_FUNC}
                openAdvancedSearch={EMPTY_FUNC}
                changeFieldValue={EMPTY_FUNC}
              />
            </MemoryRouter>
          </Provider>
        )

        expect(wrapper.find('form')).to.have.length(0)
      })

      test('should render needed components', () => {
        const entityModel = require('../../dev/test-data/userModel.json')
        const searchFormDefinition = require('../../dev/test-data/searchFormDefinition.json')

        const store = createStore(() => ({
          formData: {
            relationEntities: {data: {}},
            tooltips: {data: {}}
          },
          form: {
            detailForm: {}
          }
        }))

        const wrapper = intlEnzyme.mountWithIntl(
          <TestThemeProvider>
            <Provider store={store}>
              <MemoryRouter>
                <SearchForm
                  initializeSearchForm={EMPTY_FUNC}
                  entityModel={entityModel}
                  searchFormDefinition={searchFormDefinition}
                  setSearchInput={EMPTY_FUNC}
                  relationEntities={{}}
                  searchInputs={{}}
                  loadRelationEntities={EMPTY_FUNC}
                  loadTooltip={EMPTY_FUNC}
                  submitSearchForm={EMPTY_FUNC}
                  resetSearch={EMPTY_FUNC}
                  intl={IntlStub}
                  simpleSearchFields={[]}
                  disableSimpleSearch
                  preselectedSearchFields={[]}
                  setShowExtendedSearchForm={EMPTY_FUNC}
                  loadSearchFilters={EMPTY_FUNC}
                  openAdvancedSearch={EMPTY_FUNC}
                  changeFieldValue={EMPTY_FUNC}
                />
              </MemoryRouter>
            </Provider>
          </TestThemeProvider>
        )

        expect(wrapper.find(StatedValue)).to.have.length(3)
        expect(wrapper.find(Button)).to.have.length(3)
      })

      test('should render only the fulltext field', () => {
        const entityModel = require('../../dev/test-data/userModel.json')
        const searchFormDefinition = require('../../dev/test-data/searchFormDefinition.json')

        const store = createStore(() => ({
          formData: {
            relationEntities: {data: {}},
            tooltips: {data: {}}
          },
          form: {
            detailForm: {}
          }
        }))

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
                loadRelationEntities={EMPTY_FUNC}
                loadTooltip={EMPTY_FUNC}
                submitSearchForm={EMPTY_FUNC}
                resetSearch={EMPTY_FUNC}
                intl={IntlStub}
                simpleSearchFields={['txtFulltext']}
                preselectedSearchFields={[]}
                setShowExtendedSearchForm={EMPTY_FUNC}
                loadSearchFilters={EMPTY_FUNC}
                openAdvancedSearch={EMPTY_FUNC}
                changeFieldValue={EMPTY_FUNC}
              />
            </MemoryRouter>
          </Provider>
        )

        expect(wrapper.find(StatedValue)).to.have.length(1)
        expect(wrapper.find(Button)).to.have.length(3)
      })

      test('should render two fields', () => {
        const entityModel = require('../../dev/test-data/userModel.json')
        const searchFormDefinition = require('../../dev/test-data/searchFormDefinition.json')

        const store = createStore(() => ({
          formData: {
            relationEntities: {data: {}},
            tooltips: {data: {}}
          },
          form: {
            detailForm: {}
          }
        }))

        const wrapper = intlEnzyme.mountWithIntl(
          <Provider store={store}>
            <MemoryRouter>
              <TestThemeProvider>
                <SearchForm
                  initializeSearchForm={EMPTY_FUNC}
                  entityModel={entityModel}
                  searchFormDefinition={searchFormDefinition}
                  setSearchInput={EMPTY_FUNC}
                  relationEntities={{}}
                  searchInputs={{}}
                  loadRelationEntities={EMPTY_FUNC}
                  loadTooltip={EMPTY_FUNC}
                  submitSearchForm={EMPTY_FUNC}
                  resetSearch={EMPTY_FUNC}
                  intl={IntlStub}
                  simpleSearchFields={['txtFulltext', 'relUser_code1']}
                  preselectedSearchFields={[]}
                  setShowExtendedSearchForm={EMPTY_FUNC}
                  loadSearchFilters={EMPTY_FUNC}
                  openAdvancedSearch={EMPTY_FUNC}
                  changeFieldValue={EMPTY_FUNC}
                />
              </TestThemeProvider>
            </MemoryRouter>
          </Provider>
        )

        expect(wrapper.find(StatedValue)).to.have.length(2)
        expect(wrapper.find(Button)).to.have.length(4)
      })

      test('should not show hidden value', () => {
        const entityModel = require('../../dev/test-data/userModel.json')
        const searchFormDefinition = require('../../dev/test-data/searchFormDefinition.json')

        const preselectedSearchFields = [
          {
            id: 'relUser_code1',
            hidden: true
          }
        ]

        const store = createStore(() => ({
          formData: {
            relationEntities: {data: {}},
            tooltips: {data: {}}
          },
          form: {
            detailForm: {}
          }
        }))

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
                loadRelationEntities={EMPTY_FUNC}
                loadTooltip={EMPTY_FUNC}
                submitSearchForm={EMPTY_FUNC}
                resetSearch={EMPTY_FUNC}
                intl={IntlStub}
                disableSimpleSearch
                simpleSearchFields={[]}
                preselectedSearchFields={preselectedSearchFields}
                setShowExtendedSearchForm={EMPTY_FUNC}
                loadSearchFilters={EMPTY_FUNC}
                openAdvancedSearch={EMPTY_FUNC}
                changeFieldValue={EMPTY_FUNC}
              />
            </MemoryRouter>
          </Provider>
        )

        expect(wrapper.find(StatedValue)).to.have.length(searchFormDefinition.children.length - 1)
      })
    })
  })
})
