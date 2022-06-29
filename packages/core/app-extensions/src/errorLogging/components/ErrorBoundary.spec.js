import {IntlStub, intlEnzyme, TestThemeProvider} from 'tocco-test-util'
import {ErrorBoundaryFallback} from 'tocco-ui'

import ErrorBoundary from './ErrorBoundary'

describe('app-extensions', () => {
  describe('errorLogging', () => {
    describe('ErrorBoundary', () => {
      test('should render Fallback when error occurs', () => {
        const TestComp = () => <div id="my-comp" />
        const logSpy = sinon.spy()

        const wrapper = intlEnzyme.mountWithIntl(
          <TestThemeProvider>
            <ErrorBoundary intl={IntlStub} logError={logSpy}>
              <TestComp />
            </ErrorBoundary>
          </TestThemeProvider>
        )

        const error = new Error('test')
        wrapper.find(TestComp).simulateError(error)

        expect(wrapper.find(ErrorBoundaryFallback)).to.have.length(1)
        expect(wrapper.find(TestComp)).to.have.length(0)
      })

      test('should log error when error occurs', () => {
        const TestComp = () => <div id="my-comp" />
        const logSpy = sinon.spy()

        const wrapper = intlEnzyme.mountWithIntl(
          <TestThemeProvider>
            <ErrorBoundary intl={IntlStub} logError={logSpy}>
              <TestComp />
            </ErrorBoundary>
          </TestThemeProvider>
        )

        const error = new Error('test')
        wrapper.find(TestComp).simulateError(error)

        expect(logSpy).to.be.calledOnce
      })

      test('should render children when no error occured', () => {
        const TestComp = () => <div id="my-comp" />
        const logSpy = sinon.spy()

        const wrapper = intlEnzyme.mountWithIntl(
          <TestThemeProvider>
            <ErrorBoundary intl={IntlStub} logError={logSpy}>
              <TestComp />
            </ErrorBoundary>
          </TestThemeProvider>
        )

        expect(wrapper.find(ErrorBoundaryFallback)).to.have.length(0)
        expect(wrapper.find(TestComp)).to.have.length(1)
      })
    })
  })
})
