import {mockData} from 'tocco-util'

export default function setupFetchMock(packageName, fetchMock) {
  mockData.setupSystemMock(packageName, fetchMock, require('./textResources.json'))

  fetchMock.get(new RegExp('^.*?/nice2/rest/devcon/dbrefactoring/fragments'), [{
    id: 'SchemaUpgradeFragment',
    label: 'SchemaUpgradeFragment',
    selected: true
  }, {
    id: 'UpgradeLanguageFragment',
    label: 'UpgradeLanguageFragment',
    selected: false
  }, {
    id: 'FixCountersFragment',
    label: 'FixCountersFragment',
    selected: true
  }])

  fetchMock.get(new RegExp('^.*?/nice2/rest/devcon/dbrefactoring/modules'), [
    'nice.userbase',
    'nice.optional.address',
    'nice.customer.test'
  ])

  fetchMock.post(new RegExp('^.*?/nice2/rest/devcon/dbrefactoring/executions'), (url, opts) => {
    const execId = JSON.parse(opts.body).ignoreErrors === true ? 'exec-success-id' : 'exec-failure-id'
    return {
      status: 202,
      headers: {
        Location: `/nice2/rest/devcon/dbrefactoring/executions/${execId}`
      }
    }
  })

  fetchMock.get(new RegExp('^.*?/nice2/rest/devcon/dbrefactoring/executions/exec-failure-id'), {
    state: 'failed'
  })

  fetchMock.get(new RegExp('^.*?/nice2/rest/devcon/dbrefactoring/executions/exec-success-id'), {
    state: 'completed'
  })

  fetchMock.spy()
}
