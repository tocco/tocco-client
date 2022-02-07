import {request} from 'tocco-util'

export const sendRequest = endpoint => request.executeRequest(`rest/${endpoint}`)

export const extractBody = response => (response.status === 200 ? response.json() : null)
