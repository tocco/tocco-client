import React from 'react'
import {storeFactory} from 'tocco-util'
import {setLimit, setShowSearchForm, setSearchFilters} from './modules/actions'
import {setPreselectedSearchFields, setSimpleSearchFields, setDisableSimpleSearch} from './modules/searchForm/actions'
import asyncRoute from '../../util/asyncRoute'
import {dispatchInput} from '../../util/input'

export default (store, input) => props => {
  const Component = asyncRoute(() =>
    new Promise(resolve => {
      require.ensure([], require => {
        const ListViewContainer = require('./containers/ListViewContainer').default

        const reducer = require('./modules').default
        const searchFormReducer = require('./modules/searchForm').default

        const sagas = require('./modules/sagas').default
        const searchFormSagas = require('./modules/searchForm/sagas').default

        storeFactory.injectReducers(store, {
          list: reducer,
          searchForm: searchFormReducer
        })

        storeFactory.injectSaga(store, sagas)
        storeFactory.injectSaga(store, searchFormSagas)

        dispatchInput(store, input, 'limit', setLimit)
        dispatchInput(store, input, 'showSearchForm', setShowSearchForm)
        dispatchInput(store, input, 'searchFilters', setSearchFilters)
        dispatchInput(store, input, 'disableSimpleSearch', setDisableSimpleSearch)
        dispatchInput(store, input, 'simpleSearchFields', setSimpleSearchFields)
        dispatchInput(store, input, 'preselectedSearchFields', setPreselectedSearchFields)

        resolve(ListViewContainer)
      })
    })
  )
  return <Component {...props}/>
}
