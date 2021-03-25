import {v4 as uuid} from 'uuid'

const originIdName = 'originId'
const originIdPrefix = 'client_'

const getOriginId = () => {
  if (sessionStorage.getItem(originIdName)) {
    return sessionStorage.getItem(originIdName)
  }
  const id = `${originIdPrefix}_${uuid()}`
  sessionStorage.setItem(originIdName, id)
  return id
}

export default getOriginId
