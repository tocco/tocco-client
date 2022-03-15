import {mockData} from 'tocco-util'

export default function setupFetchMock(packageName, fetchMock) {
  mockData.setupSystemMock(packageName, fetchMock, require('./textResources.json'))

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  fetchMock.get(new RegExp('^.*?/nice2/rest/templates/Export_template'), (url, opts) =>
    sleep(1000).then(() => {
      return {
        templates: [
          {
            key: 1,
            label: 'Label 1'
          },
          {
            key: 2,
            label: 'Label 2'
          }
        ],
        defaultTemplate: {
          key: 2,
          label: 'Label 2'
        }
      }
    })
  )

  fetchMock.spy()
}
