import {reducer as reducerUtil} from 'tocco-util'
import _get from 'lodash/get'

import viewPersistor from './reducer'

export const addToStore = store => {
  reducerUtil.injectReducers(store, {viewPersistor})
}

export const viewInfoSelector = (state, location) =>
  _get(state, ['viewPersistor', 'persistedViews', location, 'info'], {})
