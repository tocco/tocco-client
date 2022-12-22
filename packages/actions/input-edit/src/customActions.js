import {queryString as queryStringUtil} from 'tocco-util'

export default ({onCancel, router: {history}}) => ({
  cancel: onCancel,
  fullscreen: (definition, selection) => {
    const search = queryStringUtil.toQueryString({
      selection,
      actionProperties: definition.properties
    })
    history.push({
      pathname: '/action/' + definition.appId,
      state: {
        definition,
        selection,
        originUrl: history.location.pathname
      },
      search
    })
  }
})
