import {configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import chaiEnzyme from 'chai-enzyme'

// These settings have to be configured in test-bundler.js files and won't work if set in test-setup.js
export default () => {
  configure({adapter: new Adapter()})
  global.chai.use(chaiEnzyme())
}
