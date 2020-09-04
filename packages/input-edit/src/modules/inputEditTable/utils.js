import {api} from 'tocco-util'

export const transformResponseData = response =>
  response.body.data.map(dataRecord => {
    const splitObj = Object.keys(dataRecord).reduce((acc, key) => {
      const isInputField = !isNaN(parseInt(key))
      return {
        ...acc,
        ...(isInputField ? {
          inputFields: {
            ...acc.inputFields,
            [key]: dataRecord[key]
          }
        } : {
          entityFields: {
            ...acc.entityFields,
            [key]: dataRecord[key]
          }
        })
      }
    }, {
      inputFields: {},
      entityFields: {}
    })

    return {...splitObj.inputFields, ...api.flattenPaths(splitObj.entityFields)}
  }
  ).map(dataRecord => ({...dataRecord, __key: dataRecord.pk}))
