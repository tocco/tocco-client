import {reducer as reducerUtil} from 'tocco-util'

import reducer from './reducer'

export const addToStore = store => {
  reducerUtil.injectReducers(store, {
    login: reducer
  })
}
