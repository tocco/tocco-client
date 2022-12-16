import {screen, waitFor} from '@testing-library/react'
import {IntlStub, testingLibrary} from 'tocco-test-util'

import ErrorBoundary from './ErrorBoundary'

describe('app-extensions', () => {
  describe('errorLogging', () => {
    describe('ErrorBoundary', () => {
      test('should render Fallback when error occurs', async () => {
        const TestComp = () => {
          throw new Error()
        }
        const logSpy = sinon.spy()

        testingLibrary.renderWithIntl(
          <ErrorBoundary intl={IntlStub} logError={logSpy}>
            <TestComp />
          </ErrorBoundary>
        )

        const fallback = await waitFor(() => screen.getByText('client.component.errorBoundary.text'))

        expect(fallback).to.exist
      })

      test('should log error when error occurs', async () => {
        const TestComp = () => {
          throw new Error()
        }
        const logSpy = sinon.spy()

        testingLibrary.renderWithIntl(
          <ErrorBoundary intl={IntlStub} logError={logSpy}>
            <TestComp />
          </ErrorBoundary>
        )

        await waitFor(() => screen.getByText('client.component.errorBoundary.text'))

        expect(logSpy).to.be.calledOnce
      })

      test('should render children when no error occured', () => {
        const TestComp = () => <div data-testid="my-comp" />
        const logSpy = sinon.spy()

        testingLibrary.renderWithIntl(
          <ErrorBoundary intl={IntlStub} logError={logSpy}>
            <TestComp />
          </ErrorBoundary>
        )

        expect(screen.queryByText('client.component.errorBoundary.text')).to.not.exist
        expect(screen.queryByTestId('my-comp')).to.exist
        expect(logSpy).to.not.have.been.called
      })
    })
  })
})
