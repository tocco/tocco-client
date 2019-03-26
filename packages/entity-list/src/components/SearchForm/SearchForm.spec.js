import React from 'react'
import {MemoryRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {ThemeProvider} from 'styled-components'
import {IntlStub, intlEnzyme} from 'tocco-test-util'
import {Button, FormField} from 'tocco-ui'

import SearchForm from './'

const EMPTY_FUNC = () => {
}

const theme = {
  colors: {
    paper: '#fff',
    text: '#212121',
    signal: {
      danger: {
        paper: '#EF9A9A',
        text: '#D32F2F'
      },
      info: {
        paper: '#81D4FA',
        text: '#0288D1'
      }
    }
  },
  fontFamily: {
    regular: '"Helvetica Neue", Helvetica, Arial, sans-serif'
  },
  fontSize: {
    base: 1.4
  },
  fontWeights: {
    regular: 400
  },
  lineHeights: {
    regular: 1.4
  },
  radii: {
    regular: '4px'
  },
  space: {
    base: 2,
    scale: 2
  }
}

describe('entity-list', () => {
  describe('components', () => {
    describe('SearchForm', () => {
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
          <ThemeProvider theme={theme}>
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
          </ThemeProvider>
        )

        expect(wrapper.find(FormField)).to.have.length(searchFormDefinition.children.length)
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

        expect(wrapper.find(FormField)).to.have.length(1)
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
          <ThemeProvider theme={theme}>
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
                  simpleSearchFields={['txtFulltext', 'relUser_code1']}
                  preselectedSearchFields={[]}
                  setShowExtendedSearchForm={EMPTY_FUNC}
                  loadSearchFilters={EMPTY_FUNC}
                  openAdvancedSearch={EMPTY_FUNC}
                  changeFieldValue={EMPTY_FUNC}
                />
              </MemoryRouter>
            </Provider>
          </ThemeProvider>
        )

        expect(wrapper.find(FormField)).to.have.length(2)
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

        expect(wrapper.find(FormField)).to.have.length(searchFormDefinition.children.length - 1)
      })
    })
  })
})
