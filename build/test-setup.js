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
