import consoleLogger from '../consoleLogger'

export default fetchMock => {
  fetchMock.post(
    new RegExp('^.*?/nice2/rest/actions/simpleActionWithClientQuestion*?'),
    simpleActionClientQuestionResponse()
  )

  fetchMock.post(
    new RegExp('^.*?/nice2/rest/actions/simpleAction*?'),
    simpleActionResponse()
  )
}

export const simpleActionResponse = (delay = 3000) =>
  (url, opts) => {
    return sleep(delay).then(() => {
      consoleLogger.log('fetchMock:call action', url, opts)

      return {
        status: 200,
        body: {
          successful: true,
          message: 'Action completed!'
        }
      }
    })
  }

export const simpleActionClientQuestionResponse = (delay = 3000) =>
  (url, opts) => {
    return sleep(delay).then(() => {
      consoleLogger.log('fetchMock:call action', url, opts)
      const body = JSON.parse(opts.body)
      if (!body.clientAnswers) {
        return yesNoClientQuestionResponse
      } else {
        if (!body.clientAnswers.myYesNoQuestion) {
          return {
            successful: false,
            message: 'Action failed, this is on you!'
          }
        } else {
          return {successful: true}
        }
      }
    })
  }

const yesNoClientQuestionResponse = {
  clientQuestion: {
    id: 'myYesNoQuestion',
    handler: 'YesNoQuestionHandler',
    header: 'Fail?',
    message: 'Should this action fail?<br/>Choose wisely',
    yesText: 'NO!',
    noText: 'Yes, let it fail',
    cancelText: 'Cancel'
  }
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
