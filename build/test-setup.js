import sinon from 'sinon'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(sinonChai)
chai.use(chaiAsPromised)

global.chai = chai
global.sinon = sinon
global.expect = chai.expect
global.should = chai.should()

const error = console.error // eslint-disable-line no-console
console.error = function(warning, ...args) { // eslint-disable-line no-console
  if (/(Invalid prop|Failed prop type)/.test(warning)) {
    throw new Error(warning)
  }
  error.apply(console, [warning, ...args])
}
