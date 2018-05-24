/* eslint no-console: 0 */

import {log, logError, logWarning} from './consoleLogger'

const {warn: warnBak, error: errorBak, log: logBak} = console

describe('tocco-util', () => {
  describe('consoleLogger', () => {
    afterEach(() => {
      console.log = logBak
      console.error = errorBak
      console.warn = warnBak
    })

    describe('log', () => {
      it('should call console.log', () => {
        const logSpy = sinon.spy()
        console.log = logSpy

        const msg1 = 'test message'
        const msg2 = 'test message 2'
        log(msg1, msg2, 2)

        expect(logSpy).to.be.calledWith(msg1, msg2, 2)
      })
    })

    describe('logError', () => {
      it('should call console.error', () => {
        const errorSpy = sinon.spy()
        console.error = errorSpy

        const msg1 = 'test message'
        const msg2 = 'test message 2'
        logError(msg1, msg2)

        expect(errorSpy).to.be.calledWith(msg1, msg2)
      })

      it('should use console.log as fallback', () => {
        const logSpy = sinon.spy()
        console.error = undefined
        console.log = logSpy

        const msg = 'test message'
        logError(msg)

        expect(logSpy).to.be.calledWith(msg)
      })
    })

    describe('logWarning', () => {
      it('should call console.warn', () => {
        const warnSpy = sinon.spy()
        console.warn = warnSpy

        const msg1 = 'test message'
        const msg2 = 'test message 2'
        logWarning(msg1, msg2)

        expect(warnSpy).to.be.calledWith(msg1, msg2)
      })

      it('should use console.log as fallback', () => {
        const logSpy = sinon.spy()
        console.warn = undefined
        console.log = logSpy

        const msg = 'test message'
        logWarning(msg)

        expect(logSpy).to.be.calledWith(msg)
      })
    })
  })
})
