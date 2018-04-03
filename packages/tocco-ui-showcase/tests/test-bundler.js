import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import chaiEnzyme from 'chai-enzyme'

Enzyme.configure({ adapter: new Adapter() })
chai.use(chaiEnzyme())

const __karmaWebpackManifest__ = [] // eslint-disable-line
const inManifest = path => ~__karmaWebpackManifest__.indexOf(path)

const testsContext = require.context('../src', true, /\.spec\.js$/)

const testsToRun = testsContext.keys().filter(inManifest)
  ;(testsToRun.length ? testsToRun : testsContext.keys()).forEach(testsContext)

const componentsContext = require.context('../src', true, /^((?!main).)*\.js$/)

componentsContext.keys().forEach(componentsContext)
