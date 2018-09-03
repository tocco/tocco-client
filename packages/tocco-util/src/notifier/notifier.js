import {combineReducers} from 'redux'
import {reducer as toastrReducer} from 'react-redux-toastr'

import appFactory from '../appFactory'
import sagas from './modules/sagas'
import modalComponents from './modules/modalComponents/reducer'

import '!style-loader!css-loader!react-redux-toastr/lib/css/react-redux-toastr.min.css'

export const defaultToastrOptions = {
  newestOnTop: false,
  preventDuplicates: false,
  position: 'top-right',
  progressBar: true,
  transitionOut: 'fadeOut'
}

export const addToStore = (store, accept) => {
  if (accept) {
    appFactory.injectReducers(
      store,
      {
        toastr: toastrReducer,
        notifier: combineReducers({modalComponents})
      }
    )
  }
  store.sagaMiddleware.run(sagas, accept)
}
