import {v4 as uuid} from 'uuid'

const originIdName = '_tocco_originId'
const originIdPrefix = 'client_'

const getOriginId = () => {
  if (window[originIdName]) {
    return window[originIdName]
  }
  const id = `${originIdPrefix}_${uuid()}`
  window[originIdName] = id
  return id
}

export default getOriginId
