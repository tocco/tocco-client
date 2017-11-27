import {setAppId} from './routes/entity-browser/modules/actions'

export const getDispatchActions = input => ([
  setAppId(input.id || new Date().getTime())
])
