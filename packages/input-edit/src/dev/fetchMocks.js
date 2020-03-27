import {mockData, consoleLogger} from 'tocco-util'

export default function setupFetchMock(packageName, fetchMock) {
  mockData.setupSystemMock(packageName, fetchMock, require('./textResources.json'))
  mockData.setupSystemMock('simple-form', fetchMock, require('../../../simple-form/src/dev/textResources'))

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/inputEdit/[0-9]*/form$'),
    require('./data/inputEditForm')
  )
  fetchMock.post(
    new RegExp('^.*?/nice2/rest/inputEdit/[0-9]*/data/search$'),
    (urls, opts) => sleep(1000).then(() => {
      consoleLogger.log(`Searching for data with: ${JSON.parse(opts.body).searchQueries.join(' AND ')}`)
      const offset = JSON.parse(opts.body).pagination.offset
      const recordsPerPage = JSON.parse(opts.body).pagination.recordsPerPage
      consoleLogger.log(`Reading ${recordsPerPage} records with offset ${offset}`)
      const sorting = JSON.parse(opts.body).sorting
      const response = require('./data/inputData')
      if (sorting && sorting.field) {
        const direction = sorting.direction === 'asc' ? 1 : -1
        response.data = response.data.sort((first, second) => {
          if (first[sorting.field] > second[sorting.field]) {
            return direction
          } else if (first[sorting.field] < second[sorting.field]) {
            return -1 * direction
          } else {
            return 0
          }
        })
      }
      return response
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

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/forms/Input_edit/search$'),
    require('./data/inputEditSearch')
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/Input_data/model$'),
    require('./data/inputDataModel')
  )

  fetchMock.spy()
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
