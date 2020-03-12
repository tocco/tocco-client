import {mockData} from 'tocco-util'

export default function setupFetchMock(packageName, fetchMock) {
  mockData.setupSystemMock(packageName, fetchMock, require('./textResources.json'))

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/inputEdit/[0-9]*/form$'),
    require('./data/inputEditForm')
  )
  fetchMock.post(
    new RegExp('^.*?/nice2/rest/inputEdit/[0-9]*/data/search$'),
    (urls, opts) => sleep(1000).then(() => {
      const sorting = JSON.parse(opts.body).sorting
      const data = require('./data/inputData')
      if (sorting && sorting.field) {
        const direction = sorting.direction === 'asc' ? 1 : -1
        return data.sort((first, second) => {
          if (first[sorting.field] > second[sorting.field]) {
            return direction
          } else if (first[sorting.field] < second[sorting.field]) {
            return -1 * direction
          } else {
            return 0
          }
        })
      } else {
        return data
      }
    })
  )
  fetchMock.post(
    new RegExp('^.*?/nice2/rest/inputEdit/[0-9]*/data$'),
    (urls, opts) => sleep(1000).then(() => ({
      calculatedValues: [
        {
          inputDataKey: JSON.parse(opts.body).inputDataKey,
          node: 'node1',
          value: 7
        }
      ]
    }))
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/Input_edit_data/list$'),
    require('./data/inputDataForm')
  )

  fetchMock.spy()
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
