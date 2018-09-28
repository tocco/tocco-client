import fetchMock from 'fetch-mock'

import {simpleRequest} from '../rest'
import {setupReports} from './reports'

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))

describe('tocco-util', () => {
  describe('mockData', () => {
    describe('mockData', () => {
      beforeEach(() => {
        fetchMock.reset()
        fetchMock.restore()
      })

      describe('setupReports', () => {
        test('setup basic mocks', () => {
          const getSpy = sinon.spy()
          const postSpy = sinon.spy()
          const fetchMockMock = {
            get: getSpy,
            post: postSpy
          }

          setupReports(fetchMockMock)
          expect(getSpy).to.be.called
          expect(postSpy).to.be.called
        })

        describe('Report Settings', () => {
          test('should return valid response with generalSettings', () => {
            setupReports(fetchMock)
            const resource = 'reports/sample_report/settings'
            return simpleRequest(resource).then(resp => resp.body).should.eventually.have.property('generalSettings')
          })
        })

        describe('Report Generation', () => {
          test('should return 202 status for a report', () => {
            setupReports(fetchMock)
            const resource = 'reports/sample_report/generations'
            return simpleRequest(resource, {method: 'POST', body: {settings: {}}})
              .should.eventually.have.property('status', 202)
          })

          test('should return 400 for invalid_settings_report', () => {
            setupReports(fetchMock)
            const resource = 'reports/invalid_settings_report/generations'
            return simpleRequest(resource, {method: 'POST', acceptedStatusCodes: [400], body: {settings: {}}})
              .should.eventually.have.property('status', 400)
          })
        })

        describe('Report Generation Status', () => {
          test('should first return in_progress answer and then completed.', async() => {
            setupReports(fetchMock, null, 0)

            const resource = 'reports/sample_report/generations'

            const response = await simpleRequest(resource, {method: 'POST', body: {settings: {}}})
            const location = response.headers.get('Location')

            const firstRequestResponse = await simpleRequest(location).then(resp => resp.body)
            await timeout(100)
            const sendRequestResponse = await simpleRequest(location).then(resp => resp.body)

            expect(firstRequestResponse).to.have.property('reportStatus', 'in_progress')
            expect(sendRequestResponse).to.have.property('reportStatus', 'completed')
          })

          test('should first return in_progress answer and then failed for generate_fails_report.', async() => {
            setupReports(fetchMock, null, 0)

            const resource = 'reports/generate_fails_report/generations'

            const response = await simpleRequest(resource, {method: 'POST', body: {settings: {}}})
            const location = response.headers.get('Location')

            const firstRequestResponse = await simpleRequest(location).then(resp => resp.body)
            await timeout(100)
            const sendRequestResponse = await simpleRequest(location).then(resp => resp.body)

            expect(firstRequestResponse).to.have.property('reportStatus', 'in_progress')
            expect(sendRequestResponse).to.have.property('reportStatus', 'failed')
          })
        })
      })
    })
  })
})
