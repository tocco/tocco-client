/* eslint-disable no-console */
import Enzyme from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'
import sinon from 'sinon'
import fetch from 'node-fetch'
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import chaiAsPromised from 'chai-as-promised'
import sinonChai from 'sinon-chai'

Enzyme.configure({adapter: new EnzymeAdapter()})

global.__PACKAGE_NAME__ = 'jest'

global.chai = chai
global.sinon = sinon
global.expect = chai.expect
global.should = chai.should()

global.fetch = fetch
global.Response = fetch.Response
global.Headers = fetch.Headers
global.Request = fetch.Request

chai.use(chaiEnzyme())
chai.use(sinonChai)
chai.use(chaiAsPromised)
chai.config.truncateThreshold = 0

const error = console.error
console.error = function(warning, ...args) {
  // Throw error on prop type warnings
  if (/(Invalid prop|Failed prop type)/.test(warning)) {
    throw new Error(warning)
  }

  // Do not print Rect Intl warnings
  if (/^\[React Intl\]/.test(warning)) {
    return
  }

  error.apply(console, [warning, ...args])
}
