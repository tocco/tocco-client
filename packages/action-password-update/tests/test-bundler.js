import sinon from 'sinon'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import chaiAsPromised from 'chai-as-promised'
import chaiEnzyme from 'chai-enzyme'

chai.use(sinonChai)
chai.use(chaiAsPromised)
chai.use(chaiEnzyme())

global.chai = chai
global.sinon = sinon
global.expect = chai.expect
global.should = chai.should()

const __karmaWebpackManifest__ = new Array() // eslint-disable-line
const inManifest = (path) => ~__karmaWebpackManifest__.indexOf(path)

const testsContext = require.context('../src', true, /\.spec\.js$/)

const testsToRun = testsContext.keys().filter(inManifest)
  ;(testsToRun.length ? testsToRun : testsContext.keys()).forEach(testsContext)

const componentsContext = require.context('../src', true, /^((?!main).)*\.js$/)

componentsContext.keys().forEach(componentsContext)
