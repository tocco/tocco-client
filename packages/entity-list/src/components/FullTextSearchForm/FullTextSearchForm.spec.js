import React from 'react'
import {MemoryRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {IntlStub, intlEnzyme} from 'tocco-test-util'
import {SearchBox} from 'tocco-ui'

import FullTextSearchForm from './'

const EMPTY_FUNC = () => {}

describe('entity-list', () => {
  describe('components', () => {
    describe('FullTextSearchForm', () => {
      test('should render SearchBox component', () => {
        const store = createStore(() => {})

        const wrapper = intlEnzyme.mountWithIntl(
          <Provider store={store}>
            <MemoryRouter>
              <FullTextSearchForm
                submitSearchForm={EMPTY_FUNC}
                intl={IntlStub}
              />
            </MemoryRouter>
          </Provider>
        )

        expect(wrapper.find(SearchBox)).to.have.length(1)
      })
    })
  })
})
