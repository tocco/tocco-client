export const setupReports = (fetchMock, entityStore, timeout = 2000) => {
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/report/.*/settings*?'),
    require('./data/report_settings.json')
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/report/.*/generations*?'),
    url => {
      const reportId = url.match(/^.*\/report\/([a-zA-Z0-9_]+)/)[1]
      if (reportId === 'invalid_settings_report') {
        return {
          status: 400,
          body: {
            status: 400,
            message: 'Invalid setting message',
            errorCode: 'INVALID_SETTINGS'
          }
        }
      } else {
        const generationId = Math.floor(Math.random() * 1000)
        return {
          status: 202,
          headers: {Location: `${__BACKEND_URL__}/nice2/rest/report/${reportId}/generations/${generationId}`},
          body: {}
        }
      }
    }
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/report/.*/generations/*?'),
    url => {
      const reportId = url.match(/^.*\/report\/([a-zA-Z0-9_]+)/)[1]
      const generationId = url.match(/^.*\/generations\/([a-zA-Z0-9_]+)/)[1]
      if (progressSimulator[generationId] === undefined) {
        startReportGeneration(generationId, reportId, timeout)
      }

      return progressSimulator[generationId]
    }
  )

  fetchMock.get(
    new RegExp('^.*?/nice2/rest/entities/2.0/Output_job/*?'),
    url => {
      const id = url.match(/^.*\/Output_job\/([a-zA-Z0-9]+)/)[1]
      const outputJob = require('./data/output_job')
      return {body: JSON.parse(JSON.stringify(outputJob).replace(/{id}/g, id).replace(/{date}/g, new Date().toJSON()))}
    }
  )
}

const progressSimulator = {}
const startReportGeneration = (generationId, reportId, timeout) => {
  progressSimulator[generationId] = inProgressAnswer

  const generationTime = Math.floor(Math.random() * 3) * timeout
  setTimeout(
    () => { progressSimulator[generationId] = reportId === 'generate_fails_report' ? failedAnswer : completedAnswer }
    , generationTime
  )
}

const inProgressAnswer = {
  body: {
    status: 'in_progress',
    owner: 'myuser'
  }
}

const completedAnswer = {
  body: {
    _links: {
      result: {
        href: `${__BACKEND_URL__}/nice2/rest/entities/2.0/ /33`
      }
    },
    status: 'completed',
    owner: 'myuser',
    outputJobId: 33
  }
}

const failedAnswer = {
  body: {
    status: 'failed',
    owner: 'myuser'
  }
}
